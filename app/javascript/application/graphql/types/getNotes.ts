/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNotes
// ====================================================

export interface getNotes_getNotes_edges_node {
  __typename: "Note";
  /**
   * ID from ActiveRecord
   */
  id: string;
  description: string | null;
  link: string;
  name: string;
  rating: number | null;
  timeToRead: string | null;
  markAsRead: boolean;
  tags: string[] | null;
}

export interface getNotes_getNotes_edges {
  __typename: "NoteEdge";
  /**
   * The item at the end of the edge.
   */
  node: getNotes_getNotes_edges_node | null;
}

export interface getNotes_getNotes_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface getNotes_getNotes {
  __typename: "NoteConnection";
  /**
   * A list of edges.
   */
  edges: getNotes_getNotes_edges[];
  /**
   * Information to aid in pagination.
   */
  pageInfo: getNotes_getNotes_pageInfo;
}

export interface getNotes {
  /**
   * Get all Notes
   */
  getNotes: getNotes_getNotes;
}

export interface getNotesVariables {
  first?: number | null;
  cursor?: string | null;
}
