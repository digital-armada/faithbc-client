import ISermonRepository from "@/src/application/interfaces/ISermonRepository";
import StrapiClient from "../utils/strapiClient";
import Sermon from "@/src/domain/entities/models/Sermon";

class SermonRepository implements ISermonRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllSermons(): Promise<Sermon[]> {
    const strapiResponse = await this.strapiClient.get(
      "/api/sermons?populate=speaker,series",
    );
    return strapiResponse.data.map(this.mapFromStrapi);
  }

  async getSermonBySlug(slug: string): Promise<Sermon | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/sermons?filters[slug][$eq]=${slug}&populate=speaker,series`,
    );
    return strapiResponse.data.length > 0
      ? this.mapFromStrapi(strapiResponse.data[0])
      : null;
  }

  async getSermonById(id: number): Promise<Sermon | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/sermons/${id}?populate=speaker,series`,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async createSermon(sermon: Omit<Sermon, "id">): Promise<Sermon> {
    const strapiResponse = await this.strapiClient.post("/api/sermons", {
      data: this.mapToStrapi(sermon),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }

  async updateSermon(
    id: number,
    sermon: Partial<Sermon>,
  ): Promise<Sermon | null> {
    const strapiResponse = await this.strapiClient.put(`/api/sermons/${id}`, {
      data: this.mapToStrapi(sermon),
    });
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async deleteSermon(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/sermons/${id}`);
  }

  private mapFromStrapi(data: any): Sermon {
    return {
      id: data.id,
      name: data.attributes.name,
      date: new Date(data.attributes.date),
      audio: data.attributes.audio?.data?.attributes?.url || null,
      slug: data.attributes.slug,
      youtube: data.attributes.youtube,
      verse: data.attributes.verse,
      speaker: data.attributes.speaker?.data?.id,
      series: data.attributes.series?.data?.id,
      service_type: data.attributes.service_type,
      youtubeId: data.attributes.youtubeId,
      description: data.attributes.description,
      imageUrl: data.attributes.imageUrl,
    };
  }

  private mapToStrapi(sermon: Omit<Sermon, "id"> | Partial<Sermon>): any {
    const strapiData: any = {};
    if (sermon.name) strapiData.name = sermon.name;
    if (sermon.date) strapiData.date = sermon.date;
    if (sermon.audio) strapiData.audio = sermon.audio;
    if (sermon.slug) strapiData.slug = sermon.slug;
    if (sermon.youtube) strapiData.youtube = sermon.youtube;
    if (sermon.verse) strapiData.verse = sermon.verse;
    if (sermon.speaker) strapiData.speaker = sermon.speaker;
    if (sermon.series) strapiData.series = sermon.series;
    if (sermon.service_type) strapiData.service_type = sermon.service_type;
    if (sermon.youtubeId) strapiData.youtubeId = sermon.youtubeId;
    if (sermon.description) strapiData.description = sermon.description;
    if (sermon.imageUrl) strapiData.imageUrl = sermon.imageUrl;
    return strapiData;
  }
}

export default SermonRepository;
