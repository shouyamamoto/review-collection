import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledSinglePostPage = styled.main`
  background-color: ${COLOR.BACKGROUND};
  display: grid;
  grid-template-columns: 100%;
  margin: 0 auto;
  width: 100%;
  padding: 40px 0;

  @media ${DEVICE.tabletL} {
    padding: 0 0 40px;
  }
`;

export const StyledSinglePostPageInner = styled.div`
  @media ${DEVICE.tabletL} {
    width: 95%;
    margin: 0 auto;
    min-height: 80vh;
  }

  @media ${DEVICE.laptop} {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0 20px;
    width: 100%;
    max-width: 900px;
  }

  @media ${DEVICE.laptopL} {
    max-width: 1200px;
  }
`;

export const StyledMarkdownContainer = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
    min-width: 600px;
  }
`;

export const StyledReactMarkdown = styled(ReactMarkdown)`
  padding: 60px 14px;
  border-bottom: 1px solid ${COLOR.BACKGROUND};
  background-color: ${COLOR.WHITE};
  margin-bottom: 40px;
  border-radius: 10px;

  @media ${DEVICE.tabletL} {
    padding: 60px 40px;
  }
`;

export const StyledTitleWrap = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

export const StyledTitleInner = styled.div`
  padding: 40px 14px 60px;

  @media ${DEVICE.tabletL} {
    padding: 40px 0;
    width: 95%;
    max-width: 900px;
    margin: 0 auto;
    text-align: left;
  }

  @media ${DEVICE.laptopL} {
    padding: 80px 0;
    width: 100%;
    max-width: 1200px;
  }
`;

export const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;

export const StyledCommentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
