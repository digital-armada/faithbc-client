"use client";

import { useState, useTransition } from "react";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import Modal from "./Modal";
import MultiSelect from "./MultiListBox";
import { updateUserCommGroup } from "@/features/comms/comms-actions";
import { Button } from "@/components/ui/button";

export default function AddNew({ allUsers, commUsers, group }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isPending, startTransition] = useTransition();

  console.log("selectedUsers", selectedUsers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectionChange = (newSelection) => {
    const ids = newSelection.map((user) => user.id);
    setSelectedUsers(ids);
  };

  const handleUpdate = async () => {
    startTransition(async () => {
      await updateUserCommGroup(selectedUsers, group);
      closeModal();
    });
  };

  return (
    <div>
      <Button
        onClick={openModal}
        className="flex items-center gap-2 outline-2 outline-offset-1 outline-gray-700"
      >
        <MdOutlinePersonAddAlt1 /> Add Contact to List
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Contact to List"
      >
        <MultiSelect
          allUsers={allUsers}
          commUsers={commUsers}
          onSelectionChange={handleSelectionChange}
        />
        <div className="flex items-center justify-between">
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={handleUpdate}
            >
              {isPending ? "...Updating" : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
