import { User } from '../firebase/types';

export type StateChatId = string | null;
export type StateUserId = string | null;
export type UploadImg = {
  file: File | null;
  url: string | null;
};
export type StateUser = User | null;
