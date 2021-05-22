/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userConfirmAccount
// ====================================================

export interface userConfirmAccount_userConfirmAccount {
  __typename: "User";
  email: string;
}

export interface userConfirmAccount {
  userConfirmAccount: userConfirmAccount_userConfirmAccount;
}

export interface userConfirmAccountVariables {
  token: string;
  redirectUrl: string;
}
