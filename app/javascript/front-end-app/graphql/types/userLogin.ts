/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userLogin
// ====================================================

export interface userLogin_signIn_user {
  __typename: "User";
  /**
   * ID from ActiveRecord
   */
  id: string;
  /**
   * Active Record cache key
   */
  cacheKey: string | null;
}

export interface userLogin_signIn {
  __typename: "SignInPayload";
  token: string | null;
  user: userLogin_signIn_user | null;
}

export interface userLogin {
  signIn: userLogin_signIn | null;
}

export interface userLoginVariables {
  email: string;
  password: string;
}
