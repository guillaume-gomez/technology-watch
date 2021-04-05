import { useQuery } from "@apollo/client";
import {
  UserHeader as UserQuery,
} from "../../graphql/userQueries";

import { currentUserHeader } from "../../graphql/types/currentUserHeader";

interface CurrentUserProps {
  onCompletedCallback?: (data: currentUserHeader) => void
}

export default function CurrentUser({ onCompletedCallback } : CurrentUserProps ) {
  const { loading, error, data } = useQuery(UserQuery, {
    onCompleted:(data : currentUserHeader) => {
      if(onCompletedCallback) {
        console.log("fdjkfdj")
        onCompletedCallback(data);
      }
    }
  });

  if (error) {
    console.error(error);
  }
  return { loading, error, data };
}
