// domain/entities/Event.ts
export interface Event {
  id: number;
  title: string;
  content: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  featuredImage: string | null; // URL or id of media file
  organiser: string;
  venName: string;
  venAdd: string;
  internal: boolean;
  eventStartDate: Date;
  eventEndDate: Date;
  eventStartTime: string;
  eventEndTime: string;
}

export default Event;
