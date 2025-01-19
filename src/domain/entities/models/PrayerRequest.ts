// domain/entities/PrayerRequest.ts
export interface PrayerRequest {
  name: string;
  request: string;
  date: Date;
  outcome: string;
  status: string;
}

export default PrayerRequest;
