import React from "react";
import {  useQuery } from "@apollo/client";
import {
  UserHeader as UserQuery,
} from "../../graphql/userQueries";


export default function CurrentUser() {
  const { loading, error, data } = useQuery(UserQuery);

  if(error) {
    console.error(error);
  }
  return { loading, error, data };
}
