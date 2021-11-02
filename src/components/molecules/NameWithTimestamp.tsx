import { VFC } from "react";
import styled from "styled-components";

import { DEVICE } from "../../Themes/Device";
import { index as Typography } from "../atom/typography/index";
import LikedIcon from "../../images/liked.png";

type Props = {
  username?: string;
  timestamp: string;
  likedUsers: string[];
};

export const NameWithTimestamp: VFC<Props> = ({
  username,
  timestamp,
  likedUsers,
}) => {
  return (
    <StyledNameWithTimestamp>
      <Typography size="0.7rem">{username}</Typography>
      <StyledTimeAndLike>
        <Typography size="0.7rem">{timestamp}</Typography>
        {likedUsers.length !== 0 && (
          <StyledLiked>
            <StyledLikeButton src={LikedIcon} />
            <Typography size="10px">{likedUsers.length}</Typography>
          </StyledLiked>
        )}
      </StyledTimeAndLike>
    </StyledNameWithTimestamp>
  );
};

const StyledTimeAndLike = styled.div`
  display: flex;
  margin-top: 2px;
`;

const StyledNameWithTimestamp = styled.div`
  margin-left: 0.4rem;

  @media ${DEVICE.laptop} {
    margin-left: 0.8rem;
  }
`;

const StyledLikeButton = styled.img`
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  margin-right: 2px;
`;

const StyledLiked = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
