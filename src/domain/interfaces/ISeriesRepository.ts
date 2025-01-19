// domain/interfaces/ISeriesRepository.ts
import Series from "../entities/models/Series";

interface ISeriesRepository {
  getAllSeries(): Promise<Series[]>;
  getSeriesBySlug(slug: string): Promise<Series | null>;
  getSeriesById(id: number): Promise<Series | null>;
  createSeries(series: Omit<Series, "id">): Promise<Series>;
  updateSeries(id: number, series: Partial<Series>): Promise<Series | null>;
  deleteSeries(id: number): Promise<void>;
}

export default ISeriesRepository;
