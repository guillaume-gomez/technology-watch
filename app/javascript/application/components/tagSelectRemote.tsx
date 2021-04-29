import React, { ReactElement, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import TagSelect from "./tagSelect";

import { getNote_getNote_tags_edges_node } from "../graphql/types/getNote";
import { getTagsStartWith, getTagsStartWithVariables } from "../graphql/types/getTagsStartWith";
import { GetTagsStartWith as GetTagsStartWithQuery } from "../graphql/tagQueries";

interface TagSelectRemoteProps {
  values: getNote_getNote_tags_edges_node[];
  onRemove: (index: number) => void;
  onSelect: (tag: string) => void;
}

export default function TagSelectRemote({values = [], onRemove, onSelect } : TagSelectRemoteProps) : ReactElement {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [getTagsSuggestions, { data }] = useLazyQuery<getTagsStartWith, getTagsStartWithVariables>(GetTagsStartWithQuery);
  const [search, setSearch] = useState<string>("");
  
  useEffect(() => {
    if(data && data.getTags) {
      const tags = data.getTags.edges.map(({node}) => node!.name);
      setSuggestions(tags);
    }
  }, [data]);

  useEffect(() => {
    if(search.length >= 1) {
      getTagsSuggestions({variables: { first: 20, startWith: search }})
    }
  }, [search]);


  return <TagSelect
    values={values}
    search={search}
    setSearch={setSearch}
    onRemove={onRemove}
    onSelect={onSelect}
    suggestions={suggestions}
  />
}
