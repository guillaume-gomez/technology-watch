import { useQuery } from "@apollo/client";
// @ts-ignore
import i18n from "../../i18n";
import {
  UserHeader as UserQuery,
} from "../../graphql/userQueries";

import { currentUserHeader } from "../../graphql/types/currentUserHeader";

interface CurrentUserProps {
  onCompletedCallback?: (data: currentUserHeader) => void
}

export default function CurrentUser({ onCompletedCallback } : CurrentUserProps) {
  const { loading, error, data } = useQuery(UserQuery, {
    onCompleted: (data : currentUserHeader) => {
      if (onCompletedCallback) {
        i18n.changeLanguage(data.currentUser.languageCode);
        onCompletedCallback(data);
      }
    },
  });

  if (error) {
    console.error(error);
  }
  return { loading, error, data };
}
