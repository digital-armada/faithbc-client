import IEventRepository from "@/src/domain/interfaces/IEventRepository";
import StrapiClient from "../strapiClient";
import Event from "@/src/domain/entities/models/Event";

class EventRepository implements IEventRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllEvents(): Promise<Event[]> {
    const strapiResponse = await this.strapiClient.get(
      "/api/events?populate=featuredImage",
    );
    return strapiResponse.data.map(this.mapFromStrapi);
  }
  async getEventBySlug(slug: string): Promise<Event | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/events?filters[slug][$eq]=${slug}&populate=featuredImage`,
    );
    return strapiResponse.data.length > 0
      ? this.mapFromStrapi(strapiResponse.data[0])
      : null;
  }

  async getEventById(id: number): Promise<Event | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/events/${id}?populate=featuredImage`,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  async createEvent(event: Omit<Event, "id">): Promise<Event> {
    const strapiResponse = await this.strapiClient.post("/api/events", {
      data: this.mapToStrapi(event),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }
  async updateEvent(id: number, event: Partial<Event>): Promise<Event | null> {
    const strapiResponse = await this.strapiClient.put(`/api/events/${id}`, {
      data: this.mapToStrapi(event),
    });
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async deleteEvent(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/events/${id}`);
  }

  private mapFromStrapi(data: any): Event {
    return {
      id: data.id,
      title: data.attributes.title,
      content: data.attributes.content,
      slug: data.attributes.slug,
      startDate: new Date(data.attributes.startDate),
      endDate: new Date(data.attributes.endDate),
      featuredImage:
        data.attributes.featuredImage?.data?.attributes?.url || null,
      organiser: data.attributes.organiser,
      venName: data.attributes.venName,
      venAdd: data.attributes.venAdd,
      internal: data.attributes.internal,
      eventStartDate: new Date(data.attributes.eventStartDate),
      eventEndDate: new Date(data.attributes.eventEndDate),
      eventStartTime: data.attributes.eventStartTime,
      eventEndTime: data.attributes.eventEndTime,
    };
  }
  private mapToStrapi(event: Omit<Event, "id"> | Partial<Event>): any {
    const strapiData: any = {};
    if (event.title) strapiData.title = event.title;
    if (event.content) strapiData.content = event.content;
    if (event.slug) strapiData.slug = event.slug;
    if (event.startDate) strapiData.startDate = event.startDate;
    if (event.endDate) strapiData.endDate = event.endDate;
    if (event.featuredImage) strapiData.featuredImage = event.featuredImage;
    if (event.organiser) strapiData.organiser = event.organiser;
    if (event.venName) strapiData.venName = event.venName;
    if (event.venAdd) strapiData.venAdd = event.venAdd;
    if (event.internal) strapiData.internal = event.internal;
    if (event.eventStartDate) strapiData.eventStartDate = event.eventStartDate;
    if (event.eventEndDate) strapiData.eventEndDate = event.eventEndDate;
    if (event.eventStartTime) strapiData.eventStartTime = event.eventStartTime;
    if (event.eventEndTime) strapiData.eventEndTime = event.eventEndTime;
    return strapiData;
  }
}

export default EventRepository;
