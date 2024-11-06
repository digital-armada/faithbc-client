type ApiResponse<T> = {
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
  success: boolean;
};

type RegisterUserProps = {
  username: string;
  email: string;
  password: string;
};

type UserData = {
  id: number;
  username: string;
  email: string;
};
