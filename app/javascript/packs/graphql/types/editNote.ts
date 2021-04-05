/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editNote
// ====================================================

export interface editNote_editNote {
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

export interface editNote {
  /**
   * Edit a Note
   */
  editNote: editNote_editNote;
}

export interface editNoteVariables {
  id: string;
  name?: string | null;
  link?: string | null;
  description?: string | null;
  rating?: number | null;
}
