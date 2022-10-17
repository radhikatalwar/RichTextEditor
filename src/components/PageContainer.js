import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle,
} from "./blockStyles/BlockStyleToolbar";
import "../App.css";
import { ContentState } from "draft-js";
import { Modifier } from "draft-js";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (editorState) => {
    setEditorState(editorState);
  };

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "left":
        return "align-left";
      case "center":
        return "align-center";
      case "right":
        return "align-right";
      default:
        return null;
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const onBoldClick = (event) => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onUndo = () => {
    onChange(EditorState.undo(editorState));
  };

  const onRedo = () => {
    onChange(EditorState.redo(editorState));
  };

  const onClear = () => {
    setEditorState(
      EditorState.push(editorState, ContentState.createFromText(""))
    );
  };

  // const modifiedBlockState = Modifier.setBlockData(
  //   editorState.getCurrentContent(),
  //   editorState.getSelection(),
  //   Map({ align: "align" })
  // );
  // setEditorState(EditorState.push(modifiedBlockState, "change-block-data"));

  return (
    <div className="editorContainer">
      <div className="toolbar">
        <BlockStyleToolbar
          editorState={editorState}
          onToggle={toggleBlockType}
        />

        <button className="styleButton" onClick={onBoldClick}>
          <b>B</b>
        </button>
        <button className="styleButton" onClick={onItalicClick}>
          <em>I</em>
        </button>
        <button className="styleButton" onClick={onUnderlineClick}>
          <u>U</u>
        </button>
        <button onClick={onUndo}>Un</button>
        <button onClick={onRedo}>Re</button>
        <button onClick={onClear}>clear</button>
        {/* <button onClick={alignFunction("align-center")}>left</button> */}
        {/* <button onClick={alignFunction("align-center")}>center</button> */}
        {/* <button onClick={alignFunction("align-center")}>right</button> */}
      </div>

      <div className="editors">
        <Editor
          textAlignment={"right"}
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
