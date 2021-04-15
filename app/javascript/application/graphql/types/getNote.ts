/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNote
// ====================================================

export interface getNote_getNote {
  __typename: "Note";
  /**
   * ID from ActiveRecord
   */
  id: string;
  description: string | null;
  link: string;
  name: string;
  rating: number | null;
  timeToRead: string | null;
  markAsRead: boolean;
}

export interface getNote {
  /**
   * Get a Note
   */
  getNote: getNote_getNote;
}

export interface getNoteVariables {
  id: string;
}
