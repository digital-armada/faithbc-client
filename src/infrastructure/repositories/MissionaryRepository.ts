import IMissionaryRepository from "@/src/application/interfaces/IMissionaryRepository";
import StrapiClient from "../utils/strapiClient";
import { Missionary } from "@/src/domain/entities/models/Missionary";
import { BaseConfig, PaginatedConfig } from "@/src/domain/config";

interface StrapiResponse<T> {
  data: T;
  meta: any;
}

class MissionaryRepository implements IMissionaryRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllMissionaries(
    config?: PaginatedConfig,
  ): Promise<StrapiResponse<Missionary[]>> {
    const { pageSize = 10, page = 1, token } = config || {};

    const strapiResponse = await this.strapiClient.get(
      `/api/missionaries?populate=prayerrequests`,
      token as string,
    );
    return strapiResponse.data.map(this.mapFromStrapi);
  }

  async getMissionaryById(
    id: number,
    config?: BaseConfig,
  ): Promise<Missionary | null> {
    const { token } = config || {};
    const strapiResponse = await this.strapiClient.get(
      `/api/missionaries/${id}?populate=prayerrequests`,
      token as string,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async createMissionary(
    missionary: Omit<Missionary, "id">,
    config?: BaseConfig,
  ): Promise<Missionary> {
    const { token } = config || {};
    const strapiResponse = await this.strapiClient.post(
      "/api/missionaries",
      {
        data: this.mapToStrapi(missionary),
      },
      token,
    );
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

  async deleteMissionary(id: number, config?: BaseConfig): Promise<void> {
    const { token } = config || {};

    await this.strapiClient.delete(`/api/missionaries/${id}`, token);
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
