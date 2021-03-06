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
        markAsRead
        timeToReadInMinutes
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
  query getNotes($first: Int = 20, $after: String = "", $order: NoteOrder!, $direction: NoteDirection!, $read: Boolean, $tagIds: [ID!]) {
    getNotes(first: $first, after: $after, read: $read, taggedWith: $tagIds, orderType: { order: $order, direction: $direction}) {
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
  mutation createNote($name: String!, $link: String!, $description: String, $rating: Int, $tags: [ID!], $timeToReadInMinutes: Int) {
    createNote(input: { note: {
      name: $name,
      link: $link,
      description: $description,
      rating: $rating,
      tags: $tags
      timeToReadInMinutes: $timeToReadInMinutes
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
  mutation editNote($id: ID!, $name: String, $link: String, $description: String, $rating: Int, $tags: [ID!], $timeToReadInMinutes: Int) {
    editNote(input: { note: {
      id: $id,
      name: $name,
      link: $link,
      description: $description,
      rating: $rating,
      timeToReadInMinutes: $timeToReadInMinutes,
      tags: $tags
    }}) {
      ...NoteFragment
    }
  }
${NoteFragment.fragments.note}`;

export const GetTotalNotes = gql`
  query getTotalNotes($markAsRead: Boolean!) {
    getTotalNotes(markAsRead: $markAsRead)
  }
`;