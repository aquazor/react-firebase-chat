import { Timestamp } from 'firebase/firestore';

export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status?: string;
  blocked: string[];
};

export type UserChat = {
  lastMessage: string;
  chatId: string;
  receiverId: string;
  updatedAt: number;
  isSeen: boolean;
  user: User | null;
};

export type Message = {
  createdAt: Timestamp;
  senderId: string;
  text: string;
  img?: string;
};

export type Chat = {
  createdAt: Timestamp;
  messages: Message[];
};

export type CreateUserParams = {
  email: string;
  password: string;
};
