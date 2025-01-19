// application/services/announcementService.ts
import CreateAnnouncementUseCase from "../use-cases/announcements/CreateAnnouncementUseCase";
import GetPublicAnnouncementsUseCase from "../use-cases/announcements/GetPublicAnnouncementsUseCase";
import UpdateAnnouncementUseCase from "../use-cases/announcements/UpdateAnnouncementUseCase";
import DeleteAnnouncementUseCase from "../use-cases/announcements/DeleteAnnouncementUseCase";
// import GetPaginatedAnnouncementsUseCase from "../use-cases/announcements/GetPaginatedAnnouncementsUseCase";
// import SearchAnnouncementsUseCase from "../use-cases/announcements/SearchAnnouncementsUseCase";
import GetAnnouncementByIdUseCase from "../use-cases/announcements/GetAnnouncementByIdUseCase";
import StrapiClient from "@/src/infrastructure/strapiClient";
import AnnouncementRepository from "@/src/infrastructure/repositiories/AnnouncementRepository";

interface AnnouncementServices {
  createAnnouncementUseCase: CreateAnnouncementUseCase;
  getPublicAnnouncementsUseCase: GetPublicAnnouncementsUseCase;
  updateAnnouncementUseCase: UpdateAnnouncementUseCase;
  deleteAnnouncementUseCase: DeleteAnnouncementUseCase;
  // getPaginatedAnnouncementsUseCase: GetPaginatedAnnouncementsUseCase;
  // searchAnnouncementsUseCase: SearchAnnouncementsUseCase;
  getAnnouncementByIdUseCase: GetAnnouncementByIdUseCase;
}

const createAnnouncementService = (): AnnouncementServices => {
  const strapiClient = new StrapiClient();
  const announcementRepository = new AnnouncementRepository(strapiClient);

  return {
    createAnnouncementUseCase: new CreateAnnouncementUseCase(
      announcementRepository,
    ),
    getPublicAnnouncementsUseCase: new GetPublicAnnouncementsUseCase(
      announcementRepository,
    ),
    updateAnnouncementUseCase: new UpdateAnnouncementUseCase(
      announcementRepository,
    ),
    deleteAnnouncementUseCase: new DeleteAnnouncementUseCase(
      announcementRepository,
    ),
    // getPaginatedAnnouncementsUseCase: new GetPaginatedAnnouncementsUseCase(
    //   announcementRepository,
    // ),
    // searchAnnouncementsUseCase: new SearchAnnouncementsUseCase(
    //   announcementRepository,
    // ),
    getAnnouncementByIdUseCase: new GetAnnouncementByIdUseCase(
      announcementRepository,
    ),
  };
};

export default createAnnouncementService;
