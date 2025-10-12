/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: destroyNote
// ====================================================

export interface destroyNote_destroyNote {
  __typename: "Note";
  /**
   * ID from ActiveRecord
   */
  id: string;
}

export interface destroyNote {
  /**
   * Destroy a Note
   */
  destroyNote: destroyNote_destroyNote;
}

export interface destroyNoteVariables {
  id: string;
}
