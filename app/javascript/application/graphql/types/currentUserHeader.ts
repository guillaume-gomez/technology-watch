/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUserHeader
// ====================================================

export interface currentUserHeader_currentUser_tags_edges_node {
  __typename: "Tag";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  color: string;
}

export interface currentUserHeader_currentUser_tags_edges {
  __typename: "TagEdge";
  /**
   * The item at the end of the edge.
   */
  node: currentUserHeader_currentUser_tags_edges_node | null;
}

export interface currentUserHeader_currentUser_tags {
  __typename: "TagConnection";
  /**
   * A list of edges.
   */
  edges: currentUserHeader_currentUser_tags_edges[];
}

export interface currentUserHeader_currentUser {
  __typename: "User";
  /**
   * ID from ActiveRecord
   */
  id: string;
  nickname: string;
  name: string;
  tags: currentUserHeader_currentUser_tags;
}

export interface currentUserHeader {
  /**
   * Get the current user
   */
  currentUser: currentUserHeader_currentUser;
}
