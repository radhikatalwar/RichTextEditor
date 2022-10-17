import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import BlockStyleButton from "./BlockStyleButton";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import ListIcon from "@material-ui/icons/List";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

export const BLOCK_TYPES = [];

export const HEADER_TYPES = [
  { label: "H1", style: "header-one", Icon: null },
  { label: "H2", style: "header-two", Icon: null },
  { label: "H3", style: "header-three", Icon: null },
  { label: "P", style: "paragraph", Icon: null },
  { label: "UL", style: "unordered-list-item", Icon: ListIcon },
  {
    label: "OL",
    style: "ordered-list-item",
    Icon: FormatListNumberedIcon,
  },
  {
    label: "pre",
    style: "code-block",
    Icon: null,
  },
  { label: " “ ” ", style: "blockquote" }
];

export function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const BlockStyleToolbar = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <span className="RichEditor-controls">
      <HeaderStyleDropdown
        headerOptions={HEADER_TYPES}
        active={blockType}
        onToggle={props.onToggle}
      />

      {BLOCK_TYPES.map((type) => {
        return (
          <BlockStyleButton
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            key={type.label}
            type={type}
          />
        );
      })}
    </span>
  );
};

export default BlockStyleToolbar;
