/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTagsNameContains
// ====================================================

export interface getTagsNameContains_getTags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface getTagsNameContains_getTags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: getTagsNameContains_getTags_edges_node | null;
}

export interface getTagsNameContains_getTags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: getTagsNameContains_getTags_edges[];
}

export interface getTagsNameContains {
  /**
   * Get all Tags
   */
  getTags: getTagsNameContains_getTags;
}

export interface getTagsNameContainsVariables {
  first?: number | null;
  nameContains?: string | null;
}
