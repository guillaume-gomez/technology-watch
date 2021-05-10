/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNote
// ====================================================

export interface getNote_getNote_tags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface getNote_getNote_tags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: getNote_getNote_tags_edges_node | null;
}

export interface getNote_getNote_tags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: getNote_getNote_tags_edges[];
}

export interface getNote_getNote {
  __typename: "Note";
  /**
   * ID from ActiveRecord
   */
  id: string;
  description: string | null;
  link: string;
  name: string;
  rating: number | null;
  timeToReadInMinutes: number | null;
  markAsRead: boolean;
  tags: getNote_getNote_tags;
}

export interface getNote {
  /**
   * Get a Note
   */
  getNote: getNote_getNote;
}

export interface getNoteVariables {
  id: string;
}
