export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  blocked: User[];
};

export type Chat = {
  lastMessage: string;
  chatId: string;
  receiverId: string;
  updatedAt: Date;
  user: User | null;
};

export type CreateUserParams = {
  email: string;
  password: string;
};
