export interface UserDataVariables {
  login: string;
  isFork: false;
}

export interface UserDataResponse {
  user: User;
}

interface User {
  login: string;
  name: string;
  bio: string;
  id: string;
  company: string;
  email: string;
  viewerIsFollowing: boolean;
  location: string;
  avatarUrl: string;
  repositories: Repositories;
}

interface Repositories {
  pageInfo: {
    hasNextPage: boolean;
  };
  nodes: {
    id: string;
    name: string;
    url: string;
    description: string;
    viewerHasStarred: boolean;
  }[];
  totalCount: number;
}
