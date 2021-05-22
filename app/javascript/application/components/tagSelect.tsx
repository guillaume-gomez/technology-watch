import React, { ReactElement, useState, useEffect } from "react";
import { Box, TextInput } from "grommet";
import { getNote_getNote_tags_edges_node } from "../graphql/types/getNote";
import { getTagsNameContains_getTags_edges_node } from "../graphql/types/getTagsNameContains";

import Tag from "./tag";

function renderTags(tags : getNote_getNote_tags_edges_node[], onRemove: (index: number) => void) {
  return (
    <Box align="center" direction="row" wrap pad={{ left: "xsmall" }}>
      {tags.map((tag, index) => (
        <Tag key={tag.id} onRemove={() => onRemove(index)} color={tag.color}>
          {tag.name}
        </Tag>
      ))}
    </Box>
  );
}

interface TagSelectProps {
  suggestions: getTagsNameContains_getTags_edges_node[];
  values: getNote_getNote_tags_edges_node[];
  search: string;
  setSearch: (newSearch: string) => void;
  onBlur?: () => void;
  onRemove: (index: number) => void;
  onSelect: (tag: getTagsNameContains_getTags_edges_node) => void;
}

export default function TagSelect({
  suggestions = [],
  values = [],
  onRemove,
  onSelect,
  onBlur,
  search,
  setSearch
} : TagSelectProps) : ReactElement {
  const [onBlurInput, setOnBlurInput] = useState<boolean>(false);
  const [onBlurSuggestion, setOnBlurSuggestion] = useState<boolean>(false);

  // detect manually on blur by checking if suggestion and input are on blur at the same time
  useEffect(() => {
    if(onBlur && onBlurInput && onBlurSuggestion) {
      onBlur();
    }
  }, [onBlurInput, onBlurSuggestion]);

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
          onFocus={() => setOnBlurInput(false)}
          onBlur={() => setOnBlurInput(true)}
          onSuggestionsOpen={() => setOnBlurSuggestion(false)}
          onSuggestionsClose={() => setOnBlurSuggestion(true)}
          onChange={(e) => setSearch(e.target.value)}
          onSelect={({ suggestion }) => {
            setSearch("");
            const newTag = suggestions.find((s) => s.name === suggestion);
            if (newTag) {
              onSelect(newTag);
            }
          }}
          suggestions={suggestions.filter(
            (suggestion) => suggestion.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
          ).map((result) => result.name)}
        />
      </Box>
    </Box>
  );
}
