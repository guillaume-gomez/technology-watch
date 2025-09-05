/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetPassword
// ====================================================

export interface resetPassword_userSendPasswordReset {
  __typename: "UserSendPasswordResetPayload";
  message: string;
}

export interface resetPassword {
  userSendPasswordReset: resetPassword_userSendPasswordReset | null;
}

export interface resetPasswordVariables {
  email: string;
  redirectUrl: string;
}
