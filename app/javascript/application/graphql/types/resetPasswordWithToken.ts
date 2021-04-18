/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetPasswordWithToken
// ====================================================

export interface resetPasswordWithToken_userUpdatePasswordWithToken_credentials {
  __typename: "Credential";
  accessToken: string;
  client: string;
  expiry: number;
  uid: string;
}

export interface resetPasswordWithToken_userUpdatePasswordWithToken {
  __typename: "UserUpdatePasswordWithTokenPayload";
  /**
   * Authentication credentials. Resource must be signed_in for credentials to be returned.
   */
  credentials: resetPasswordWithToken_userUpdatePasswordWithToken_credentials | null;
}

export interface resetPasswordWithToken {
  userUpdatePasswordWithToken: resetPasswordWithToken_userUpdatePasswordWithToken | null;
}

export interface resetPasswordWithTokenVariables {
  password: string;
  passwordConfirmation: string;
  resetPasswordToken: string;
}
