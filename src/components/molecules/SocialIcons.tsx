import { VFC } from "react";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import styled from "styled-components";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

export const SocialIcons: VFC = () => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <StyledLinkLists>
      <StyledLinkItems>
        <a
          href={`https://github.com/${user.githubName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledGitHubIcon />
        </a>
      </StyledLinkItems>

      <StyledLinkItems>
        <a
          href={`https://twitter.com/${user.twitterName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledTwitterIcon />
        </a>
      </StyledLinkItems>

      <StyledLinkItems>
        <a href={`${user.blogUrl}`} target="_blank" rel="noopener noreferrer">
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
