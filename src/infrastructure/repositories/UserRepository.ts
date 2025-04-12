import IUserRepository from "@/src/application/interfaces/IUserRepository";
import StrapiClient from "../utils/strapiClient";
import User from "@/src/domain/entities/models/User";

class UserRepository implements IUserRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getUserById(id: number): Promise<User | null> {
    const strapiResponse = await this.strapiClient.get(`/api/users/${id}`);
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  private mapFromStrapi(data: any): User {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }
}

export default UserRepository;
