import React, { ReactElement, ReactNode } from "react";

import { Box, Button, Text } from "grommet";

import { FormClose } from "grommet-icons";

interface TagProps {
  onRemove?: () => void;
  children: ReactNode;
  color?: string;
}

function renderTag(children : ReactNode, onRemove?: () => void, color: string = "brand") {
  return (
    <Box
      background={color}
      direction="row"
      align="center"
      round="xsmall"
      pad="xsmall"
      gap="xsmall"
      margin={{right: "xsmall"}}
    >
      <Text size="small">{children}</Text>
      {onRemove && (
        <Box background={{ color: "white", opacity: "strong" }} round="full">
          <FormClose color="brand" style={{ width: "12px", height: "12px" }} />
        </Box>
      )}
    </Box>
  );
}

function Tag({ children, onRemove, color = "brand" } :TagProps) : ReactElement {
  return (
    onRemove ? (
      <Button onClick={onRemove}>{renderTag(children, onRemove, color)}</Button>
    ) : (
      renderTag(children, onRemove, color)
    )
  );
}

export default Tag;
