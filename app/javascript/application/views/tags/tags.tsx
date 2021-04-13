import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box, 
  Spinner,
  Text,
  InfiniteScroll,
  Button,
  Heading,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  FormField,
  TextInput
} from "grommet";
import { Edit } from "grommet-icons";

import CurrentUser from "../../components/customHooks/currentUser";
import { currentUserHeader } from "../../graphql/types/currentUserHeader";

import {
  addTagsPath,
} from "../../routesPath";


export default function Tags() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [tags, setTags] = useState<string[]>([]);
  function onCompletedCallback(data : currentUserHeader) {
    if(data && data.currentUser && data.currentUser && data.currentUser.tags) {
      setTags(data.currentUser.tags);
    }
  }
  const { loading } = CurrentUser({ onCompletedCallback });


  function renderTags() {
    if(tags.length === 0) {
      return <Heading margin="none" level="4">{t("tags.no-tag")}</Heading>
    }

    return (
      <Table>
  <TableHeader>
    <TableRow>
      <TableCell scope="col" border="bottom">
        {t("tags.name")}
      </TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {tags.map((tag, index) => (
      <TableRow key={tag}>
      <TableCell scope="row">
          <TextInput disabled placeholder={t("tags.placeholder")} value={tag} />
      </TableCell>
    </TableRow>
    ))}
  </TableBody>
</Table>
    )
  }

  if(loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading level="3">{t("tags.title")}</Heading>
      <Link to={addTagsPath}>
        <Button label={t("tags.create-tag")} />
      </Link>
      <Box>
        {renderTags()}
      </Box>
      <Box direction="row" justify="end" gap="medium">
        <Button primary label={t("new-note.back")} onClick={() => history.goBack()} />
        {/*<Button type="submit" primary label={t("new-note.submit")} />*/}
      </Box>
    </Box>
  );
}
