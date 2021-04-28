/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTagsStartWith
// ====================================================

export interface getTagsStartWith_getTags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface getTagsStartWith_getTags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: getTagsStartWith_getTags_edges_node | null;
}

export interface getTagsStartWith_getTags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: getTagsStartWith_getTags_edges[];
}

export interface getTagsStartWith {
  /**
   * Get all Tags
   */
  getTags: getTagsStartWith_getTags;
}

export interface getTagsStartWithVariables {
  first?: number | null;
  startWith?: string | null;
}
