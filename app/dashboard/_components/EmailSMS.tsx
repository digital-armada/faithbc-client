"use client";
import { MdAlternateEmail, MdOutlineSms, MdSms } from "react-icons/md";
import Modal from "../../../components/blocks/Modal";
import SendSMS from "./SMS";
import { useState } from "react";
import { set } from "date-fns";
import { AtSign } from "lucide-react";

export default function EmailSMS({ users }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState([]);
  const [sms, setSms] = useState("");
  const [failedNumbers, setFailedNumbers] = useState<string[]>([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSMS = (e) => {
    e.preventDefault();
    const phoneNumbers: string[] = [];
    const failed: string[] = [];
    users.forEach((user) => {
      const contactNumber = user.attributes.contactNumber;
      if (!contactNumber || contactNumber.length !== 10) {
        console.error(
          `Invalid contact number for user: ${user.attributes.firstName}`,
        );
        failed.push(user.attributes.firstName);
      } else {
        phoneNumbers.push(`+61${contactNumber}`);
      }
    });
    setSms(phoneNumbers.join(","));
    setFailedNumbers(failed);
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
        <MdOutlineSms className="h-6 w-6" />
      </button>
      <button onClick={handleEmail}>
        <AtSign className="h-6 w-6" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SendSMS sms={sms} failedNumbers={failedNumbers} />
      </Modal>
    </div>
  );
}
