// domain/entities/CommunityGroup.ts
export interface CommGroup {
  id: number;
  groupName: string;
  users: number[]; // Initially, just store the IDs
}

export default CommGroup;
