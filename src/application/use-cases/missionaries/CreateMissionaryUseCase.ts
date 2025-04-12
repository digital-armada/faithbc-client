import IMissionaryRepository from "@/src/application/interfaces/IMissionaryRepository";
import {
  CreateMissionarySchema,
  Missionary,
} from "@/src/domain/entities/models/Missionary";

class CreateMissionaryUseCase {
  constructor(private missionaryRepository: IMissionaryRepository) {}

  async execute(input, token): Promise<Missionary> {
    const validatedFields = CreateMissionarySchema.safeParse(input);

    if (!validatedFields.success) {
      throw validatedFields.error;
    }

    return await this.missionaryRepository.createMissionary(
      validatedFields.data,
      { token },
    );
  }
}

export default CreateMissionaryUseCase;
