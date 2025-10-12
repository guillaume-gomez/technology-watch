/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTags
// ====================================================

export interface getTags_getTags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface getTags_getTags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: getTags_getTags_edges_node | null;
}

export interface getTags_getTags_pageInfo {
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

export interface getTags_getTags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: getTags_getTags_edges[];
  /**
   * Information to aid in pagination.
   */
  pageInfo: getTags_getTags_pageInfo;
}

export interface getTags {
  /**
   * Get all Tags
   */
  getTags: getTags_getTags;
}

export interface getTagsVariables {
  first?: number | null;
  cursor?: string | null;
}
