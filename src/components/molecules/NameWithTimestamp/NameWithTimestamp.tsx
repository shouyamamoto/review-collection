import { VFC } from "react";

import { index as Typography } from "../../atom/typography/index";
import LikedIcon from "../../../images/liked.png";

import {
  StyledNameWithTimestamp,
  StyledTimeAndLike,
  StyledLiked,
  StyledLikeButton,
} from "./Styles";

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
