import { BaseConfig, PaginatedConfig } from "@/src/domain/config";
import { Missionary } from "@/src/domain/entities/models/Missionary";

interface ApiResponse<T> {
  data: T;
  meta: any;
}

export interface IMissionaryRepository {
  createMissionary(
    missionary: Omit<Missionary, "id">,
    config?: BaseConfig,
  ): Promise<Missionary>;
  getMissionaryById(
    id: number,
    config?: BaseConfig,
  ): Promise<Missionary | null>;
  updateMissionary(
    id: number,
    missionary: Partial<Missionary>,
    config?: BaseConfig,
  ): Promise<Missionary | null>;
  deleteMissionary(id: number, config?: BaseConfig): Promise<void>;

  getAllMissionaries(
    config?: PaginatedConfig,
  ): Promise<ApiResponse<Missionary[]>>;
}

export default IMissionaryRepository;
