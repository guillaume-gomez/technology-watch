/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userSignUp
// ====================================================

export interface userSignUp_userSignUp_user {
  __typename: "User";
  /**
   * ID from ActiveRecord
   */
  id: string;
}

export interface userSignUp_userSignUp_credentials {
  __typename: "Credential";
  accessToken: string;
  expiry: number;
  tokenType: string;
}

export interface userSignUp_userSignUp {
  __typename: "UserSignUpPayload";
  user: userSignUp_userSignUp_user | null;
  /**
   * Authentication credentials. Null if after signUp resource is not active for authentication (e.g. Email confirmation required).
   */
  credentials: userSignUp_userSignUp_credentials | null;
}

export interface userSignUp {
  userSignUp: userSignUp_userSignUp | null;
}

export interface userSignUpVariables {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  nickname: string;
}
