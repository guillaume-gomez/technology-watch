import React, { ReactElement, ReactNode, useState } from "react";

import { Box, TextInput } from "grommet";

import Tag from "./tag";

function renderTags(tags : string[], onRemove: (index: number) => void) {
  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {tags.map((tag, index) => (
        <Tag key={tag} onRemove={() => onRemove(index)}>
          {tag}
        </Tag>
      ))}
    </Box>
  );
}

interface TagSelectProps {
  suggestions: string[];
  value: string[];
  onRemove: (index: number) => void;
  onSelect: (tag: string) => void;
}

export default function TagSelect({suggestions = [], value = [], onRemove, onSelect } : TagSelectProps) : ReactElement {
  const [search, setSearch] = useState<string>("");
  return (
    <Box
      wrap={true}
      direction="row"
      align="center"
      border="all"
      round="xsmall"
      pad="xxsmall"
    >
      {value.length > 0 && renderTags(value, onRemove)}
      <Box
        alignSelf="stretch"
        align="start"
        flex={true}
        style={{ minWidth: "240px" }}
      >
        <TextInput
          plain={true}
          placeholder="Select tags"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSelect={ ({ suggestion }) => {
            setSearch("");
            onSelect(suggestion)
          }}
          suggestions={suggestions.filter(
            suggestion =>
              suggestion.toLowerCase().indexOf(search.toLowerCase()) >= 0
          )}
        />
      </Box>
    </Box>
  );
}
