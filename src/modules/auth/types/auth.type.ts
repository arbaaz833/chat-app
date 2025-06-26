export type User = {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  lastSeen: Date;
  conversations: string[] | [];
  unreadCount: { id: string; count: number }[];
};
