// domain/entities/User.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // password would probably not be here as this would be handled by authentication process
  // Add any other user fields as needed
}

export default User;
