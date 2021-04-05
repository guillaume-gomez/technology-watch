/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoteFragment
// ====================================================

export interface NoteFragment {
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
