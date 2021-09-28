import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  CodeComponent,
  ReactMarkdownNames,
} from "react-markdown/lib/ast-to-react";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

const customStyle = {
  padding: "40px 10px 40px",
  margin: "20px 0",
  whiteSpace: "pre-line",
};

export const index: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const matchName = /language-(\w+)(:.+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  const name = matchName && matchName[2] ? matchName[2].slice(1) : "";

  return !inline && match ? (
    <CodeBlockWrapper>
      {name && <CodeBlockTitle>{name}</CodeBlockTitle>}
      <SyntaxHighlighter
        style={dracula}
        language={lang}
        children={String(children).replace(/\n$/, "")}
        customStyle={customStyle}
        PreTag="div"
        showLineNumbers
      />
    </CodeBlockWrapper>
  ) : (
    <code className={className}>{children}</code>
  );
};

const CodeBlockWrapper = styled.div`
  position: relative;
`;

const CodeBlockTitle = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${COLOR.BACKGROUND};
  padding: 4px 14px;
  color: ${COLOR.BLACK};
  font-size: 14px;
`;
