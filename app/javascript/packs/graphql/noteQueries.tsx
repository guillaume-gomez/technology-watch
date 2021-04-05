import gql from "graphql-tag";

export const NoteFragment = {
  fragments: {
    note: gql`
      fragment NoteFragment on Note {
        id
        description
        link
        name
        rating
        timeToRead
        markAsRead
      }
    `,
  },
};

export const GetNotes = gql`
  query getNotes($first: Int, $cursor: String) {
    getNotes(first: $first, after: $cursor) {
      edges {
        node {
          ...NoteFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
${NoteFragment.fragments.note}`;

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
      ...NoteFragment
    }
  }
${NoteFragment.fragments.note}`;

export const DestroyNote = gql`
  mutation destroyNote($id: ID!) {
    destroyNote(input: { id: $id }) {
      id
    }
  }
`;

export const MarkAsRead = gql`
  mutation markAsRead($id: ID!, $markAsRead: Boolean!) {
    editNote(input: { note: {id: $id, markAsRead: $markAsRead} }) {
      id
      markAsRead
    }
  }
`;