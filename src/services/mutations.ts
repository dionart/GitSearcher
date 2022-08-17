import { gql } from "@apollo/client";

export const ADD_STAR = gql`
  mutation AddStar($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        stargazerCount
        id
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation RemoveStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        stargazerCount
        id
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input) {
      user {
        name
        avatarUrl
        id
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      user {
        name
        avatarUrl
        id
      }
    }
  }
`;
