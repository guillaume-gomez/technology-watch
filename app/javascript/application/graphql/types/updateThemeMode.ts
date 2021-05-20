/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateThemeMode
// ====================================================

export interface updateThemeMode_editUser {
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

export interface updateThemeMode {
  /**
   * Edit a User
   */
  editUser: updateThemeMode_editUser;
}

export interface updateThemeModeVariables {
  id: string;
  themeMode?: string | null;
}
