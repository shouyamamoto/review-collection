import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";
import { index as TextArea } from "../../atom/textArea/index";

export const StyledCommentInputArea = styled.div`
  text-align: right;
`;

export const StyledTextArea = styled(TextArea)`
  min-height: 240px;
  width: calc(100% - 28px);
  margin: 0 auto 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.8;
  padding: 20px 14px;

  @media ${DEVICE.tabletL} {
    width: 100%;
    padding: 28px;
  }
`;

export const StyledButtonWrap = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;
