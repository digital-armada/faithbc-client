import IMissionaryRepository from "@/src/application/interfaces/IMissionaryRepository";

class DeleteMissionaryUseCase {
  constructor(private missionaryRepository: IMissionaryRepository) {}

  async execute(id: number, token: string): Promise<void> {
    await this.missionaryRepository.deleteMissionary(id, { token });
  }
}
