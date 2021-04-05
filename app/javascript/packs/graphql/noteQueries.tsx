import gql from "graphql-tag";

export const GetNotes = gql`
  query getNotes($first: Int, $cursor: String) {
    getNotes(first: $first, after: $cursor) {
      edges {
        node {
          id
          description
          link
          name
          rating
          timeToRead
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
