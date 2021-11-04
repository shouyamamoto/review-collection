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
  onMouseEnter: (target: string) => void;
  isShow?: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
};

export const SocialIcons: VFC<Props> = ({
  githubName,
  twitterName,
  blogUrl,
  onMouseEnter,
  isShow,
}) => {
  return (
    <StyledLinkLists>
      {githubName && (
        <StyledLinkItems
          onMouseEnter={() => onMouseEnter("github")}
          onMouseLeave={() => onMouseEnter("github")}
        >
          <a
            href={`https://github.com/${githubName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledGitHubIcon />
          </a>
          {isShow?.github && <StyledLinkText>{githubName}</StyledLinkText>}
        </StyledLinkItems>
      )}

      {twitterName && (
        <StyledLinkItems
          onMouseEnter={() => onMouseEnter("twitter")}
          onMouseLeave={() => onMouseEnter("twitter")}
        >
          <a
            href={`https://twitter.com/${twitterName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledTwitterIcon />
          </a>
          {isShow?.twitter && <StyledLinkText>{twitterName}</StyledLinkText>}
        </StyledLinkItems>
      )}

      {blogUrl && (
        <StyledLinkItems
          onMouseEnter={() => onMouseEnter("blogUrl")}
          onMouseLeave={() => onMouseEnter("blogUrl")}
        >
          <a href={`${blogUrl}`} target="_blank" rel="noopener noreferrer">
            <StyledBlogIcon />
          </a>
          {isShow?.blogUrl && <StyledLinkText>{blogUrl}</StyledLinkText>}
        </StyledLinkItems>
      )}
    </StyledLinkLists>
  );
};

const StyledLinkLists = styled.ul`
  display: flex;
`;
const StyledLinkItems = styled.li`
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

const StyledLinkText = styled.p`
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
