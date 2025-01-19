// infrastructure/repositories/CommunityGroupRepository.ts
import CommGroup from "@/src/domain/entities/models/CommGroup";
import ICommsGroupRepository from "@/src/domain/interfaces/ICommsGroupRepository";
import StrapiClient from "../strapiClient";

class CommGroupRepository implements ICommsGroupRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllCommunityGroups(): Promise<CommGroup[]> {
    const strapiResponse = await this.strapiClient.get(
      "/api/commgroups?populate=users",
    );
    return strapiResponse.data.map(this.mapFromStrapi);
  }
  async getCommunityGroupById(id: number): Promise<CommGroup | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/commgroups/${id}?populate=users`,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  async createCommunityGroup(
    communityGroup: Omit<CommGroup, "id">,
  ): Promise<CommGroup> {
    const strapiResponse = await this.strapiClient.post("/api/commgroups", {
      data: this.mapToStrapi(communityGroup),
    });
    return this.mapFromStrapi(strapiResponse.data);
  }
  async updateCommunityGroup(
    id: number,
    communityGroup: Partial<CommGroup>,
  ): Promise<CommGroup | null> {
    const strapiResponse = await this.strapiClient.put(
      `/api/commgroups/${id}`,
      { data: this.mapToStrapi(communityGroup) },
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  async deleteCommunityGroup(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/commgroups/${id}`);
  }
  private mapFromStrapi(data: any): CommGroup {
    return {
      id: data.id,
      groupName: data.attributes.groupName,
      users: data.attributes.users.data.map((user: any) => user.id),
    };
  }
  private mapToStrapi(
    communityGroup: Omit<CommGroup, "id"> | Partial<CommGroup>,
  ): any {
    const strapiData: any = {};
    if (communityGroup.groupName)
      strapiData.groupName = communityGroup.groupName;
    if (communityGroup.users) strapiData.users = communityGroup.users;
    return strapiData;
  }
}

export default CommGroupRepository;
