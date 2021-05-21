import React, { ReactElement, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import TagSelect from "./tagSelect";

import { getNote_getNote_tags_edges_node } from "../graphql/types/getNote";
import { getTagsNameContains, getTagsNameContainsVariables, getTagsNameContains_getTags_edges_node } from "../graphql/types/getTagsNameContains";
import { GetTagsNameContains as GetTagsNameContainsQuery } from "../graphql/tagQueries";

import { nbItems } from "../views/tags/tagConstants";

interface TagSelectRemoteProps {
  values: getNote_getNote_tags_edges_node[];
  onRemove: (index: number) => void;
  onSelect: (tag: getTagsNameContains_getTags_edges_node) => void;
}

export default function TagSelectRemote({ values = [], onRemove, onSelect } : TagSelectRemoteProps) : ReactElement {
  const [suggestions, setSuggestions] = useState<getTagsNameContains_getTags_edges_node[]>([]);
  const [getTagsSuggestions, { data }] = useLazyQuery<getTagsNameContains, getTagsNameContainsVariables>(GetTagsNameContainsQuery, { fetchPolicy: "no-cache" });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (data && data.getTags) {
      const tagIds = values.map((v) => v.id);
      const tags = data.getTags.edges
        .map(({ node }) => node!)
        .filter((node) => !tagIds.includes(node.id));
      setSuggestions(tags);
    }
  }, [data, values]);

  useEffect(() => {
    if (search.length >= 1) {
      getTagsSuggestions({ variables: { first: nbItems, nameContains: search } });
    }
  }, [search, getTagsSuggestions]);

  return (
    <TagSelect
      values={values}
      search={search}
      setSearch={setSearch}
      onRemove={onRemove}
      onSelect={onSelect}
      suggestions={suggestions}
    />
  );
}
