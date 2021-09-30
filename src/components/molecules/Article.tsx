import { VFC } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { COLOR } from "../../Themes/Color";
import { index as Icon } from "../atom/icon";
import { DEVICE } from "../../Themes/Device";

type Props = {
  username: string;
  avatar: string;
  title: string;
  body: string;
  timestamp: any;
};

export const Article: VFC<Props> = ({ username, avatar, title, timestamp }) => {
  return (
    <StyledArticle>
      <StyledTitle>{title}</StyledTitle>
      <StyledIconWithName>
        <Icon src={avatar} alt={username} width="30" height="30" />
        <div>
          <StyledUsername>{username}</StyledUsername>
          <StyledTimestamp>
            {timestamp && format(timestamp, "yyyy-MM-dd")}に公開
          </StyledTimestamp>
        </div>
      </StyledIconWithName>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-height: 120px;
  background-color: ${COLOR.WHITE};
  padding: 20px 0;
  border-radius: 10px;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 12px -1px #04253f40;
    cursor: pointer;
  }
`;

const StyledIconWithName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 20px);
  min-width: 0;
  max-width: 90%;
  margin: auto auto 0;
`;

const StyledUsername = styled.p`
  font-size: 11px;
  margin-left: 0.4rem;

  @media ${DEVICE.laptop} {
    margin-left: 0.8rem;
  }
`;

const StyledTitle = styled.h2`
  font-size: 13px;
  padding: 0 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  height: 6.05em;
  max-height: 6.05em;
  margin-bottom: 14px;

  @media ${DEVICE.laptop} {
    font-size: 14px;
    padding: 0 16px;
    margin-bottom: 18px;
  }
`;

const StyledTimestamp = styled.p`
  font-size: 11px;
  margin-left: 0.4rem;

  @media ${DEVICE.laptop} {
    margin-left: 0.8rem;
  }
`;
