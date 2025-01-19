import IMissionaryRepository from "@/src/domain/interfaces/IMissionaryRepository";
import StrapiClient from "../strapiClient";
import Missionary from "@/src/domain/entities/models/Missionary";

class MissionaryRepository implements IMissionaryRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllMissionaries(): Promise<Missionary[]> {
    const strapiResponse = await this.strapiClient.get(
      "/api/missionaries?populate=prayerrequests",
    );
    return strapiResponse.data.map(this.mapFromStrapi);
  }

  async getMissionaryById(id: number): Promise<Missionary | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/missionaries/${id}?populate=prayerrequests`,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async createMissionary(
    missionary: Omit<Missionary, "id">,
  ): Promise<Missionary> {
    const strapiResponse = await this.strapiClient.post("/api/missionaries", {
      data: this.mapToStrapi(missionary),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }

  async updateMissionary(
    id: number,
    missionary: Partial<Missionary>,
  ): Promise<Missionary | null> {
    const strapiResponse = await this.strapiClient.put(
      `/api/missionaries/${id}`,
      { data: this.mapToStrapi(missionary) },
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async deleteMissionary(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/missionaries/${id}`);
  }

  private mapFromStrapi(data: any): Missionary {
    return {
      id: data.id,
      name: data.attributes.name,
      location: data.attributes.location,
      prayerrequests: data.attributes.prayerrequests.map((req: any) => ({
        name: req.name,
        request: req.request,
        date: new Date(req.date),
        outcome: req.outcome,
        status: req.status,
      })),
    };
  }
  private mapToStrapi(
    missionary: Omit<Missionary, "id"> | Partial<Missionary>,
  ): any {
    const strapiData: any = {};
    if (missionary.name) strapiData.name = missionary.name;
    if (missionary.location) strapiData.location = missionary.location;
    if (missionary.prayerrequests)
      strapiData.prayerrequests = missionary.prayerrequests.map((req: any) => ({
        name: req.name,
        request: req.request,
        date: req.date,
        outcome: req.outcome,
        status: req.status,
      }));
    return strapiData;
  }
}

export default MissionaryRepository;
