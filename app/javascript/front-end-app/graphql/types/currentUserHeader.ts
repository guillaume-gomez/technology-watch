/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUserHeader
// ====================================================

export interface currentUserHeader_currentUser {
  __typename: "User";
  /**
   * ID from ActiveRecord
   */
  id: string;
  nickname: string;
  name: string;
  languageCode: string;
  themeMode: string;
}

export interface currentUserHeader {
  /**
   * Get the current user
   */
  currentUser: currentUserHeader_currentUser;
}
