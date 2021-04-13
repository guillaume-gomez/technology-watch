/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNote
// ====================================================

export interface createNote_createNote {
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
  tags: string[] | null;
}

export interface createNote {
  /**
   * Create a Note
   */
  createNote: createNote_createNote;
}

export interface createNoteVariables {
  userId: string;
  name: string;
  link: string;
  description?: string | null;
  rating?: number | null;
  tags?: string[] | null;
}
