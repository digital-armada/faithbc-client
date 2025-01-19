import PrayerRequest from "./PrayerRequest";

// domain/entities/Missionary.ts
export interface Missionary {
  id: number;
  name: string;
  location: string;
  prayerrequests: PrayerRequest[]; // Array of PrayerRequest objects.
}

export default Missionary;
