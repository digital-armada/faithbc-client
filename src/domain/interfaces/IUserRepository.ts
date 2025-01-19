import User from "../entities/models/User";

export interface IUserRepository {
  getUserById(id: number): Promise<User | null>;
  // Add user management methods as needed
}

export default IUserRepository;
