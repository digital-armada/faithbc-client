// domain/interfaces/ICommunityGroupRepository.ts
import CommGroup from "@/src/domain/entities/models/CommGroup";

export interface ICommsGroupRepository {
  getAllCommunityGroups(): Promise<CommGroup[]>;
  getCommunityGroupById(id: number): Promise<CommGroup | null>;
  createCommunityGroup(
    communityGroup: Omit<CommGroup, "id">,
  ): Promise<CommGroup>;
  updateCommunityGroup(
    id: number,
    communityGroup: Partial<CommGroup>,
  ): Promise<CommGroup | null>;
  deleteCommunityGroup(id: number): Promise<void>;
}

export default ICommsGroupRepository;
