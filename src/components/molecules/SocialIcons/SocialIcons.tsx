import { VFC } from "react";

import {
  StyledLinkLists,
  StyledLinkItems,
  StyledGitHubIcon,
  StyledTwitterIcon,
  StyledBlogIcon,
  StyledLinkText,
} from "./Styles";

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
