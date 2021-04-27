/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Properties for add, edit and destroy Tags
 */
export interface TagBulkType {
  id?: string | null;
  destroy?: boolean | null;
  name?: string | null;
  color?: string | null;
}

/**
 * Properties for creating a Nested Tag
 */
export interface TagNestedInput {
  name: string;
  tagId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
