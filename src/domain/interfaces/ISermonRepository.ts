import Sermon from "../entities/models/Sermon";

export interface ISermonRepository {
  getAllSermons(): Promise<Sermon[]>;
  getSermonBySlug(slug: string): Promise<Sermon | null>;
  getSermonById(id: number): Promise<Sermon | null>;
  createSermon(sermon: Omit<Sermon, "id">): Promise<Sermon>;
  updateSermon(id: number, sermon: Partial<Sermon>): Promise<Sermon | null>;
  deleteSermon(id: number): Promise<void>;
}

export default ISermonRepository;
