import { VFC } from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import styled from "styled-components";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

type Props = {
  githubName: string;
  twitterName: string;
  blogUrl: string;
};

export const SocialIcons: VFC<Props> = ({
  githubName,
  twitterName,
  blogUrl,
}) => {
  return (
    <StyledLinkLists>
      <StyledLinkItems>
        <a
          href={`https://github.com/${githubName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledGitHubIcon />
        </a>
      </StyledLinkItems>

      <StyledLinkItems>
        <a
          href={`https://twitter.com/${twitterName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledTwitterIcon />
        </a>
      </StyledLinkItems>

      <StyledLinkItems>
        <a href={`${blogUrl}`} target="_blank" rel="noopener noreferrer">
          <StyledBlogIcon />
        </a>
      </StyledLinkItems>
    </StyledLinkLists>
  );
};

const StyledLinkLists = styled.ul`
  display: flex;
`;
const StyledLinkItems = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    cursor: pointer;
    color: ${COLOR.BLACK};
  }
`;

const StyledGitHubIcon = styled(AiFillGithub)`
  font-size: 24px;
  color: ${COLOR.BLACK};

  @media ${DEVICE.tabletL} {
    font-size: 26px;

    &:hover {
      color: ${COLOR.PRIMARY};
    }
  }
`;

const StyledTwitterIcon = styled(FaTwitter)`
  font-size: 24px;
  color: ${COLOR.BLACK};

  @media ${DEVICE.tabletL} {
    font-size: 26px;

    &:hover {
      color: ${COLOR.PRIMARY};
    }
  }
`;

const StyledBlogIcon = styled(AiOutlineLink)`
  font-size: 24px;
  color: ${COLOR.BLACK};

  @media ${DEVICE.tabletL} {
    font-size: 26px;

    &:hover {
      color: ${COLOR.PRIMARY};
    }
  }
`;
