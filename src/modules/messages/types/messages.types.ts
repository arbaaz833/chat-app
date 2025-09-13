export type Message = {
  text?: string;
  media?: string[];
  sender: string;
  conversation: string;
  createdAt: string;
  updatedAt: string;
  placeholder?: boolean;
  _id: string;
};
