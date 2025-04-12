import Event from "@/src/domain/entities/models/Event";

interface IEventRepository {
  getAllEvents(): Promise<Event[]>;
  getEventBySlug(slug: string): Promise<Event | null>;
  getEventById(id: number): Promise<Event | null>;
  createEvent(event: Omit<Event, "id">): Promise<Event>;
  updateEvent(id: number, event: Partial<Event>): Promise<Event | null>;
  deleteEvent(id: number): Promise<void>;
}

export default IEventRepository;
