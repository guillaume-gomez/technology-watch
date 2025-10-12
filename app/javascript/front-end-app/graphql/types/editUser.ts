/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editUser
// ====================================================

export interface editUser_editUser {
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

export interface editUser {
  /**
   * Edit a User
   */
  editUser: editUser_editUser;
}

export interface editUserVariables {
  id: string;
  name?: string | null;
  nickname?: string | null;
  languageCode?: string | null;
}
