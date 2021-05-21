import React, { ReactElement } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  Paragraph,
  Anchor
} from "grommet";

import {
  addTagsPath,
  privateRootPath
} from "../../routesPath";


export default function About() : ReactElement {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading level="3">{t("about.title")}</Heading>
      <Paragraph fill >
        <Trans i18nKey="about.explanation">
          {[<Anchor href="https://en.wikipedia.org/wiki/Technology_intelligence"/>]}
        </Trans>
      </Paragraph>
      <Paragraph>
        {t("about.more-info")} <Anchor href="https://github.com/guillaume-gomez/technology-watch" label={t("about.github-repository")} />
      </Paragraph>
      <Paragraph fill>
        <Trans i18nKey="about.ticket">
          {[<Anchor href="https://github.com/guillaume-gomez/technology-watch/issues"/>]}
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans i18nKey="about.made">
          {[<Anchor href="https://guillaume-gomez.github.io/"/>]}
        </Trans>
        {" "+ t("about.year")}
      </Paragraph>
      <Text weight="bold" size="large" margin={{top: "medium", bottom: "medium"}}>{t("about.server")}</Text>
      <Box direction="row" justify="start">
        <Link to={privateRootPath}>
          <Button label={t("about.back")} />
        </Link>
      </Box>
    </Box>
  );
}
