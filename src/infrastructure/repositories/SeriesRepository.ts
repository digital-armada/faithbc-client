import ISeriesRepository from "@/src/application/interfaces/ISeriesRepository";
import StrapiClient from "../utils/strapiClient";
import Series from "@/src/domain/entities/models/Series";

class SeriesRepository implements ISeriesRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllSeries(): Promise<Series[]> {
    const strapiResponse = await this.strapiClient.get("/api/series");
    return strapiResponse.data.map(this.mapFromStrapi);
  }

  async getSeriesBySlug(slug: string): Promise<Series | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/series?filters[slug][$eq]=${slug}`,
    );
    return strapiResponse.data.length > 0
      ? this.mapFromStrapi(strapiResponse.data[0])
      : null;
  }
  async getSeriesById(id: number): Promise<Series | null> {
    const strapiResponse = await this.strapiClient.get(`/api/series/${id}`);
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  async createSeries(series: Omit<Series, "id">): Promise<Series> {
    const strapiResponse = await this.strapiClient.post("/api/series", {
      data: this.mapToStrapi(series),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }
  async updateSeries(
    id: number,
    series: Partial<Series>,
  ): Promise<Series | null> {
    const strapiResponse = await this.strapiClient.put(`/api/series/${id}`, {
      data: this.mapToStrapi(series),
    });
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async deleteSeries(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/series/${id}`);
  }

  private mapFromStrapi(data: any): Series {
    return {
      id: data.id,
      name: data.attributes.name,
      slug: data.attributes.slug,
    };
  }
  private mapToStrapi(series: Omit<Series, "id"> | Partial<Series>): any {
    const strapiData: any = {};
    if (series.name) strapiData.name = series.name;
    if (series.slug) strapiData.slug = series.slug;
    return strapiData;
  }
}

export default SeriesRepository;
