/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NoteDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum NoteOrder {
  MARK_AS_READ = "MARK_AS_READ",
  RATING = "RATING",
  RECENT = "RECENT",
  TIMES_TO_READ = "TIMES_TO_READ",
}

/**
 * Properties for add, edit and destroy Tags
 */
export interface TagBulkType {
  id?: string | null;
  destroy?: boolean | null;
  name?: string | null;
  color?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
