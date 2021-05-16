/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editNote
// ====================================================

export interface editNote_editNote_tags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface editNote_editNote_tags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: editNote_editNote_tags_edges_node | null;
}

export interface editNote_editNote_tags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: editNote_editNote_tags_edges[];
}

export interface editNote_editNote {
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
  tags: editNote_editNote_tags;
}

export interface editNote {
  /**
   * Edit a Note
   */
  editNote: editNote_editNote;
}

export interface editNoteVariables {
  id: string;
  name?: string | null;
  link?: string | null;
  description?: string | null;
  rating?: number | null;
  tags?: string[] | null;
}
