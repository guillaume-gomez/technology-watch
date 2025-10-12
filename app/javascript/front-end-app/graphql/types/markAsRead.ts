/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: markAsRead
// ====================================================

export interface markAsRead_editNote {
  __typename: "Note";
  /**
   * ID from ActiveRecord
   */
  id: string;
  markAsRead: boolean;
}

export interface markAsRead {
  /**
   * Edit a Note
   */
  editNote: markAsRead_editNote;
}

export interface markAsReadVariables {
  id: string;
  markAsRead: boolean;
}
