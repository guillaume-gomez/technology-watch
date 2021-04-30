import React, { ReactElement, useState } from "react";
import { getNote_getNote_tags_edges_node } from "../graphql/types/getNote";
import { getTagsStartWith_getTags_edges_node } from "../graphql/types/getTagsStartWith";

import { Box, TextInput } from "grommet";

import Tag from "./tag";

function renderTags(tags : getNote_getNote_tags_edges_node[], onRemove: (index: number) => void) {
  return (
    <Box align="center" direction="row" wrap pad={{ left: "xsmall" }}>
      {tags.map((tag, index) => (
        <Tag key={tag.id} onRemove={() => onRemove(index)}>
          {tag.name}
        </Tag>
      ))}
    </Box>
  );
}

interface TagSelectProps {
  suggestions: getTagsStartWith_getTags_edges_node[];
  values: getNote_getNote_tags_edges_node[];
  search: string;
  setSearch: (newSearch: string) => void;
  onRemove: (index: number) => void;
  onSelect: (tag: getTagsStartWith_getTags_edges_node) => void;
}

export default function TagSelect({
  suggestions = [], values = [], onRemove, onSelect, search, setSearch
} : TagSelectProps) : ReactElement {

  return (
    <Box
      wrap
      direction="row"
      align="center"
      border="all"
      round="xsmall"
      pad="xxsmall"
    >
      {values.length > 0 && renderTags(values, onRemove)}
      <Box
        alignSelf="stretch"
        align="start"
        flex
        style={{ minWidth: "240px" }}
      >
        <TextInput
          plain
          placeholder="Select tags"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSelect={({ suggestion }) => {
            setSearch("");
            const newTag = suggestions.find(s => s.name === suggestion);
            if(newTag) {
              onSelect(newTag);
            }
          }}
          suggestions={suggestions.filter(
            (suggestion) => suggestion.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
          ).map(result => result.name)}
        />
      </Box>
    </Box>
  );
}
