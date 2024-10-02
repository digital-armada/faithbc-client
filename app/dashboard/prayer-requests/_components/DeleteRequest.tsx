"use client";

import { deletePrayerRequest } from "@/data/actions/prayer-actions";

export default function DeleteRequest(id) {
  return <button onClick={() => deletePrayerRequest(id)}>Delete</button>;
}
