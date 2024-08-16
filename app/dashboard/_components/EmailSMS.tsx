"use client";
import { MdAlternateEmail, MdSms } from "react-icons/md";
import Modal from "./Modal";
import SendSMS from "./SMS";
import { useState } from "react";
import { set } from "date-fns";

export default function EmailSMS({ users }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState([]);
  const [sms, setSms] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSMS = (e) => {
    e.preventDefault();
    const phoneNumbers = users
      .map((user) => `+61${user.attributes.contactNumber}`)
      .filter((number) => number)
      .join(",");
    setSms(phoneNumbers);
    navigator.clipboard
      .writeText(phoneNumbers)
      .then(() => {
        console.log("Phone numbers copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    openModal();
  };
  const handleEmail = (e) => {
    e.preventDefault();
    const emailAddresses = users
      .map((user) => user.attributes.email)
      .filter((email) => email)
      .join(", ");
    setEmail(emailAddresses);
    navigator.clipboard
      .writeText(emailAddresses)
      .then(() => {
        console.log("Email addresses copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    openModal();
  };

  return (
    <div className="flex gap-8">
      <button onClick={handleSMS}>
        <MdSms className="h-8 w-8" />
      </button>
      <button onClick={handleEmail}>
        <MdAlternateEmail className="h-8 w-8" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Send an SMS">
        <SendSMS email={email} sms={sms} />
      </Modal>
    </div>
  );
}
