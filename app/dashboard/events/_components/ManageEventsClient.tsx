"use client";
import { deleteEvent } from "@/data/actions/event-action";
import Link from "next/link";
import { TiTrash } from "react-icons/ti";

export default function ManageEventsClient({ data }) {
  const handleDelete = async (id) => {
    await deleteEvent(id);
  };

  return (
    <>
      {data.data.map((event) => {
        console.log(event);
        return (
          <div className="flex justify-between" key={event.id}>
            <Link
              href={`/dashboard/events/manage/${event.id}`}
              className="flex justify-between"
            >
              <div>{event.attributes.title}</div>
            </Link>
            <button onClick={() => handleDelete(event.id)}>
              <TiTrash />
            </button>
          </div>
        );
      })}
    </>
  );
}
