/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userLogout
// ====================================================

export interface userLogout_userLogout_authenticatable {
  __typename: "User";
  email: string;
}

export interface userLogout_userLogout {
  __typename: "UserLogoutPayload";
  authenticatable: userLogout_userLogout_authenticatable;
}

export interface userLogout {
  userLogout: userLogout_userLogout | null;
}
