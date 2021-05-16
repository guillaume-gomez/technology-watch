/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNote
// ====================================================

export interface createNote_createNote_tags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface createNote_createNote_tags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: createNote_createNote_tags_edges_node | null;
}

export interface createNote_createNote_tags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: createNote_createNote_tags_edges[];
}

export interface createNote_createNote {
  __typename: "Note";
  /**
   * ID from ActiveRecord
   */
  id: string;
  description: string | null;
  link: string;
  name: string;
  rating: number | null;
  markAsRead: boolean;
  tags: createNote_createNote_tags;
}

export interface createNote {
  /**
   * Create a Note
   */
  createNote: createNote_createNote;
}

export interface createNoteVariables {
  name: string;
  link: string;
  description?: string | null;
  rating?: number | null;
  tags?: string[] | null;
}
