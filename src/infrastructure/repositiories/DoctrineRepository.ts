import IDoctrineRepository from "@/src/domain/interfaces/IDoctrineRepository";
import StrapiClient from "../strapiClient";
import Doctrine from "@/src/domain/entities/models/Doctrine";

class DoctrineRepository implements IDoctrineRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllDoctrines(): Promise<Doctrine[]> {
    const strapiResponse = await this.strapiClient.get("/api/doctrines");
    return strapiResponse.data.map(this.mapFromStrapi);
  }

  async getDoctrineBySlug(slug: string): Promise<Doctrine | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/doctrines?filters[slug][$eq]=${slug}`,
    );
    return strapiResponse.data.length > 0
      ? this.mapFromStrapi(strapiResponse.data[0])
      : null;
  }

  async createDoctrine(doctrine: Omit<Doctrine, "id">): Promise<Doctrine> {
    const strapiResponse = await this.strapiClient.post("/api/doctrines", {
      data: this.mapToStrapi(doctrine),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }

  async updateDoctrine(
    id: number,
    doctrine: Partial<Doctrine>,
  ): Promise<Doctrine | null> {
    const strapiResponse = await this.strapiClient.put(`/api/doctrines/${id}`, {
      data: this.mapToStrapi(doctrine),
    });
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async deleteDoctrine(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/doctrines/${id}`);
  }

  private mapFromStrapi(data: any): Doctrine {
    return {
      id: data.id,
      title: data.attributes.title,
      content: data.attributes.content,
      slug: data.attributes.slug,
    };
  }
  private mapToStrapi(doctrine: Omit<Doctrine, "id"> | Partial<Doctrine>): any {
    const strapiData: any = {};
    if (doctrine.title) strapiData.title = doctrine.title;
    if (doctrine.content) strapiData.content = doctrine.content;
    if (doctrine.slug) strapiData.slug = doctrine.slug;
    return strapiData;
  }
}

export default DoctrineRepository;
