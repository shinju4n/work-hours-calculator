import React from "react";
import styled from "@emotion/styled";

interface FlexBoxProps {
  direction?: "row" | "column";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
  alignItems?: "center" | "flex-start" | "flex-end";
  gap?: number;
}

const FlexBox = styled.div<FlexBoxProps>(props => ({
  display: "flex",
  flexDirection: props.direction || "row",
  justifyContent: props.justifyContent || "center",
  alignItems: props.alignItems || "center",
  gap: `${props.gap || 0}rem`,
  width: "100%",
}));

export default FlexBox;
