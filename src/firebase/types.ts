export type User = {
  id: string;
  username: string;
  email: string;
  blocked: User[];
};

export type CreateUserParams = {
  email: string;
  password: string;
};
