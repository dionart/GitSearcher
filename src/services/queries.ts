import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($login: String!, $isFork: Boolean!) {
    user(login: $login) {
      login
      name
      bio
      id
      company
      email
      viewerIsFollowing
      location
      avatarUrl
      repositories(last: 40, isFork: $isFork) {
        pageInfo {
          hasNextPage
        }
        nodes {
          id
          name
          url
          description
          viewerHasStarred
        }
        totalCount
      }
    }
  }
`;
