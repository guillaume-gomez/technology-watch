/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userResendConfirmation
// ====================================================

export interface userResendConfirmation_userResendConfirmation {
  __typename: "UserResendConfirmationPayload";
  message: string;
}

export interface userResendConfirmation {
  userResendConfirmation: userResendConfirmation_userResendConfirmation | null;
}

export interface userResendConfirmationVariables {
  email: string;
  redirectUrl: string;
}
