/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NoteOrder, NoteDirection } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: getNotes
// ====================================================

export interface getNotes_getNotes_edges_node_tags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface getNotes_getNotes_edges_node_tags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: getNotes_getNotes_edges_node_tags_edges_node | null;
}

export interface getNotes_getNotes_edges_node_tags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: getNotes_getNotes_edges_node_tags_edges[];
}

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
  markAsRead: boolean;
  timeToReadInMinutes: number | null;
  tags: getNotes_getNotes_edges_node_tags;
}

export interface getNotes_getNotes_edges {
  __typename: "NoteEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
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
  after?: string | null;
  order: NoteOrder;
  direction: NoteDirection;
}
