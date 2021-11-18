import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledTimeAndLike = styled.div`
  display: flex;
  margin-top: 2px;
`;

export const StyledNameWithTimestamp = styled.div`
  margin-left: 0.4rem;

  @media ${DEVICE.laptop} {
    margin-left: 0.8rem;
  }
`;

export const StyledLikeButton = styled.img`
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  margin-right: 2px;
`;

export const StyledLiked = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
