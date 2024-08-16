"use client";

import { useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import FormDateTimePicker from "@/components/ui/FormDateTimePicker";
import FormInput from "@/components/ui/FormInput";
import {
  createNewAnnouncement,
  deleteAnnouncement,
} from "@/data/actions/announcement-actions";
import formatDateTime from "@/lib/formatDateTime";
import { TiTrash } from "react-icons/ti";
import DashHeader from "../../_components/DashHeader";

type AnnouncementFormProps = {
  message: string;
  date: string; // ISO 8601 date string
};

export default function AnnouncementForm({
  announcements,
}: {
  announcements: AnnouncementFormProps[];
}) {
  const formRef = useRef(null);
  const [state, formAction] = useFormState(createNewAnnouncement, null);

  useEffect(() => {
    if (state?.data) {
      // If the submission was successful, reset the form
      formRef.current.reset();
    }
  }, [state]);

  return (
    <>
      <DashHeader heading="Announcements" />
      <form ref={formRef} action={formAction}>
        <FormInput
          label="Announcement"
          id="message"
          name="message"
          type="text"
        />
        <FormDateTimePicker
          label="Select event date and time"
          dateId="event-date"
          dateName="event-date"
        />
        <button type="submit">Submit</button>
      </form>

      {state?.error && <p>Error: {state.error}</p>}

      <div>
        {announcements.map((announcement) => (
          <div key={announcement.id} className="flex gap-4">
            <div>{formatDateTime(announcement.attributes.date)}</div>
            <div>{announcement.attributes.message}</div>
            <button onClick={() => deleteAnnouncement(announcement.id)}>
              <TiTrash />
            </button>{" "}
          </div>
        ))}
      </div>
    </>
  );
}
