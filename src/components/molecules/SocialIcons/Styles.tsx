import styled from "styled-components";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledLinkLists = styled.ul`
  display: flex;
`;
export const StyledLinkItems = styled.li`
  position: relative;
  line-height: 1;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    cursor: pointer;
    color: ${COLOR.BLACK};
  }
`;

export const StyledLinkText = styled.p`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${COLOR.GRAY};
  color: ${COLOR.WHITE};
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
  padding: 2px 20px;
`;

export const StyledGitHubIcon = styled(AiFillGithub)`
  font-size: 24px;
  color: ${COLOR.BLACK};

  @media ${DEVICE.tabletL} {
    font-size: 26px;

    &:hover {
      color: ${COLOR.PRIMARY};
    }
  }
`;

export const StyledTwitterIcon = styled(FaTwitter)`
  font-size: 24px;
  color: ${COLOR.BLACK};

  @media ${DEVICE.tabletL} {
    font-size: 26px;

    &:hover {
      color: ${COLOR.PRIMARY};
    }
  }
`;

export const StyledBlogIcon = styled(AiOutlineLink)`
  font-size: 24px;
  color: ${COLOR.BLACK};

  @media ${DEVICE.tabletL} {
    font-size: 26px;

    &:hover {
      color: ${COLOR.PRIMARY};
    }
  }
`;
