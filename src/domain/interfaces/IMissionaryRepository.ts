import Missionary from "../entities/models/Missionary";

export interface IMissionaryRepository {
  getAllMissionaries(): Promise<Missionary[]>;
  getMissionaryById(id: number): Promise<Missionary | null>;
  createMissionary(missionary: Omit<Missionary, "id">): Promise<Missionary>;
  updateMissionary(
    id: number,
    missionary: Partial<Missionary>,
  ): Promise<Missionary | null>;
  deleteMissionary(id: number): Promise<void>;
}

export default IMissionaryRepository;
