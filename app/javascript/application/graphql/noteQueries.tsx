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
        tags {
          edges {
            node {
              id
              name
              color
            }
          }
        }
      }
    `,
  },
};

export const GetNotes = gql`
  query getNotes($first: Int = 20, $after: String = "", $order: NoteOrder) {
    getNotes(first: $first, after: $after, order: $order) {
      edges {
        cursor
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

export const GetNote = gql`
  query getNote($id: ID!) {
    getNote(id: $id) {
      ...NoteFragment
    }
  }
${NoteFragment.fragments.note}`;

export const CreateNote = gql`
  mutation createNote($name: String!, $link: String!, $description: String, $rating: Int, $tags: [ID!]) {
    createNote(input: { note: {
      name: $name,
      link: $link,
      description: $description,
      rating: $rating,
      tags: $tags
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

export const EditNote = gql`
  mutation editNote($id: ID!, $name: String, $link: String, $description: String, $rating: Int, $tags: [ID!]) {
    editNote(input: { note: {
      id: $id,
      name: $name,
      link: $link,
      description: $description,
      rating: $rating,
      tags: $tags
    }}) {
      ...NoteFragment
    }
  }
${NoteFragment.fragments.note}`;
