export type Conversation = {
  _id: string;
  type: "chat" | "group";
  members: Array<{
    id: string;
    username: string;
    profilePicture: string;
  }>;
  admins: string[];
  groupName?: string;
  groupAvatar?: string;
  createdBy: string;
  pastMembers: string[];
  createdAt: string;
  updatedAt: string;
};
