/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagBulkType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: bulkUpdateTags
// ====================================================

export interface bulkUpdateTags_bulkUpdateTags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface bulkUpdateTags_bulkUpdateTags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: bulkUpdateTags_bulkUpdateTags_edges_node | null;
}

export interface bulkUpdateTags_bulkUpdateTags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: bulkUpdateTags_bulkUpdateTags_edges[];
}

export interface bulkUpdateTags {
  /**
   * Add/Update and Destroy Tags
   */
  bulkUpdateTags: bulkUpdateTags_bulkUpdateTags;
}

export interface bulkUpdateTagsVariables {
  tags: TagBulkType[];
}
