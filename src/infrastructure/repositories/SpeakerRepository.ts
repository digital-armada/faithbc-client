import ISpeakerRepository from "@/src/application/interfaces/ISpeakerRepository";
import StrapiClient from "../utils/strapiClient";
import Speaker from "@/src/domain/entities/models/Speaker";

class SpeakerRepository implements ISpeakerRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllSpeakers(): Promise<Speaker[]> {
    const strapiResponse = await this.strapiClient.get("/api/speakers");
    return strapiResponse.data.map(this.mapFromStrapi);
  }

  async getSpeakerById(id: number): Promise<Speaker | null> {
    const strapiResponse = await this.strapiClient.get(`/api/speakers/${id}`);
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async createSpeaker(speaker: Omit<Speaker, "id">): Promise<Speaker> {
    const strapiResponse = await this.strapiClient.post("/api/speakers", {
      data: this.mapToStrapi(speaker),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }
  async updateSpeaker(
    id: number,
    speaker: Partial<Speaker>,
  ): Promise<Speaker | null> {
    const strapiResponse = await this.strapiClient.put(`/api/speakers/${id}`, {
      data: this.mapToStrapi(speaker),
    });
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async deleteSpeaker(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/speakers/${id}`);
  }

  private mapFromStrapi(data: any): Speaker {
    return {
      id: data.id,
      speaker: data.attributes.speaker,
    };
  }
  private mapToStrapi(speaker: Omit<Speaker, "id"> | Partial<Speaker>): any {
    const strapiData: any = {};
    if (speaker.speaker) strapiData.speaker = speaker.speaker;
    return strapiData;
  }
}

export default SpeakerRepository;
