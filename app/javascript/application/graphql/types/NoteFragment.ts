/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoteFragment
// ====================================================

export interface NoteFragment_tags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface NoteFragment_tags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: NoteFragment_tags_edges_node | null;
}

export interface NoteFragment_tags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: NoteFragment_tags_edges[];
}

export interface NoteFragment {
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
  tags: NoteFragment_tags;
}
