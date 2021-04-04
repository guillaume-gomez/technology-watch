/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userLogin
// ====================================================

export interface userLogin_userLogin_credentials {
  __typename: "Credential";
  accessToken: string;
  expiry: number;
}

export interface userLogin_userLogin_authenticatable {
  __typename: "User";
  /**
   * ID from ActiveRecord
   */
  id: string;
  name: string;
  nickname: string;
  email: string;
}

export interface userLogin_userLogin {
  __typename: "UserLoginPayload";
  credentials: userLogin_userLogin_credentials;
  authenticatable: userLogin_userLogin_authenticatable;
}

export interface userLogin {
  userLogin: userLogin_userLogin | null;
}

export interface userLoginVariables {
  email: string;
  password: string;
}
