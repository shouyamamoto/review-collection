import { VFC } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { COLOR } from "../../Themes/Color";

import { index as Icon } from "../atom/icon";
import { index as Link } from "../atom/link";
import { NameWithTimestamp } from "./NameWithTimestamp";
import { DEVICE } from "../../Themes/Device";

type Props = {
  postId: string;
  uid: string;
  username: string;
  avatar: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
  labels: string[];
};

export const Article: VFC<Props> = ({
  postId,
  uid,
  username,
  avatar,
  title,
  timestamp,
  likedUsers,
  labels,
}) => {
  return (
    <StyledArticle>
      <Link to={`/${uid}/articles/${postId}`}>
        <StyledArticleTitle>{title}</StyledArticleTitle>
      </Link>
      <StyledLabels>
        {labels.map((label, index) => (
          <>{index < 2 && <StyledLabel key={index}>{label}</StyledLabel>} </>
        ))}
      </StyledLabels>
      <StyledIconWithName>
        <Link to={`/${uid}`}>
          <Icon src={avatar} alt={username} width="20" height="20" />
        </Link>
        <Link to={`/${uid}`}>
          <NameWithTimestamp
            username={username}
            timestamp={timestamp && format(timestamp, "yyyy-MM-dd")}
            likedUsers={likedUsers}
          />
        </Link>
      </StyledIconWithName>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 120px;
  background-color: ${COLOR.WHITE};
  padding: 20px 0;
  border-radius: 10px;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 12px -1px #04253f40;
  }
`;

const StyledIconWithName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: calc(100% - 20px);
  min-width: 0;
  max-width: 90%;
  margin: auto auto 0;
`;

const StyledArticleTitle = styled.p`
  font-size: 13px;
  font-weight: bold;
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

const StyledLabels = styled.ul`
  width: 90%;
  margin: 0 auto 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  gap: 4px;
  box-sizing: border-box;
`;

const StyledLabel = styled.li`
  display: grid;
  place-items: center;
  font-size: 10px;
  text-align: center;
  background-color: ${COLOR.BACKGROUND};
  color: ${COLOR.BLACK};
  padding: 4px;
  border-radius: 4px;
`;
