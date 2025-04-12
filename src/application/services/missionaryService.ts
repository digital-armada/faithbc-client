import CreateMissionaryUseCase from "@/src/application/use-cases/missionaries/CreateMissionaryUseCase";
import MissionaryRepository from "@/src/infrastructure/repositories/MissionaryRepository";
import StrapiClient from "@/src/infrastructure/utils/strapiClient";

interface MissionaryServices {
  createMissionaryUseCase: CreateMissionaryUseCase;
}

const createMissionaryService = (): MissionaryServices => {
  const strapiClient = new StrapiClient();
  const missionaryRepository = new MissionaryRepository(strapiClient);

  return {
    createMissionaryUseCase: new CreateMissionaryUseCase(missionaryRepository),
  };
};

export default createMissionaryService;
