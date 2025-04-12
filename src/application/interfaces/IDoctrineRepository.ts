import Doctrine from "@/src/domain/entities/models/Doctrine";

export interface IDoctrineRepository {
  getAllDoctrines(): Promise<Doctrine[]>;
  getDoctrineBySlug(slug: string): Promise<Doctrine | null>;
  createDoctrine(doctrine: Omit<Doctrine, "id">): Promise<Doctrine>;
  updateDoctrine(
    id: number,
    doctrine: Partial<Doctrine>,
  ): Promise<Doctrine | null>;
  deleteDoctrine(id: number): Promise<void>;
}

export default IDoctrineRepository;
