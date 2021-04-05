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

export const CreateNote = gql`
  mutation createNote($userId: ID!, $name: String!, $link: String!, $description: String, $rating: Int, $timeToRead: ISO8601DateTime) {
    createNote(input: { note: {
      userId: $userId,
      name: $name,
      link: $link,
      description: $description,
      rating: $rating
      timeToRead: $timeToRead
    }}) {
      id
      name
      description
      link
      rating
      timeToRead
    }
  }
`;