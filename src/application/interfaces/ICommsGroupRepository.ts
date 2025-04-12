import CommGroup from "@/src/domain/entities/models/CommGroup";

interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface ICommsGroupRepository {
  getAllCommunityGroups(token: string): Promise<StrapiResponse<CommGroup[]>>;
  getCommunityGroupById(
    id: number,
    token: string,
  ): Promise<StrapiResponse<CommGroup | null>>;
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
