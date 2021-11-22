import { createGlobalStyle } from "styled-components";
import { COLOR } from "../Themes/Color";

export const GlobalStyle = createGlobalStyle`
* {
  line-height: 1.6;
  letter-spacing: 0.07em;
  padding: 0;
  margin: 0;
  list-style: none;
} 
body {
  font-family: "ヒラギノ角ゴ Pro","ヒラギノ角ゴ","メイリオ","ＭＳ Ｐゴシック",system-ui,sans-serif;
}
html, body {
  height: 100%;
}
#root {
  display: flex;
  flex-direction: column;
  height: 100%;
}
main {
  flex: 1;
}
footer {
  margin-top: auto;
}
ul,li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
}
.preview > :first-child {
  margin-top: 0;
}
.preview > p {
  margin-top: 1.5rem;
}
.preview code {
  background-color: ${COLOR.BACKGROUND};
  padding: 2px 8px;
  border-radius: 4px;
  color: ${COLOR.CODE};
}
.preview blockquote {
  margin-top: 1.5rem;
  padding: 10px 20px;
  color: ${COLOR.GRAY};
  border-left: 4px solid ${COLOR.BACKGROUND};
}
.preview hr {
  margin: 1.5rem 0;
  background-color: ${COLOR.BACKGROUND};
  height: 2px;
  border: none;
}
.preview ul,
.preview ol {
  margin-top: 1.5rem;
}
.preview ul ul,
.preview ol ol {
  margin-top: 0;
}
.preview ul, 
.preview ul li {
  list-style: disc inside !important;
}
.preview ul li li{
  list-style: circle inside !important;
}
.preview ul li li li {
  list-style: disc inside !important;
}
.preview ol,
.preview ol li {
  list-style: decimal inside !important;
}
.preview ol li li {
  list-style: lower-roman inside !important;
}
.preview ol li li li{
  list-style: decimal inside !important;
}
.preview li {
  padding-left: 10px;
}
.preview h1 {
  font-size: 25px;
  border-bottom: 2px solid ${COLOR.BACKGROUND};
  padding: 0.4rem 0;
  margin-top: 2.4rem;
}
.preview h2 {
  font-size: 22px;
  padding: 0.4rem 0;
  margin-top: 2rem;
}
.preview h3,
.preview h4,
.preview h5,
.preview h6 {
  padding: 0.4rem 0;
  margin-top: 1.5rem;
}
.preview img {
  width: 100%;
  display: inline-block;
  margin: 0 auto;
}
.preview img + em {
  display: block;
  text-align: center;
  color: ${COLOR.GRAY};
  font-size: 12px;
}
.preview a + em {
  display: block;
  text-align: center;
  color: ${COLOR.GRAY};
  font-size: 12px;
}
.preview a {
  color: ${COLOR.PRIMARY};
}
.preview table {
  margin-top: 1.5rem;
}
.preview table, td, th {
  padding: 0.42rem;
  border-collapse: collapse;
  border: 1px solid ${COLOR.BACKGROUND};
} 
.preview thead {
  background-color: ${COLOR.BACKGROUND};
}
`;
