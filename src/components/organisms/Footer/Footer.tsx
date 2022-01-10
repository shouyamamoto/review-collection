import { VFC } from "react";

import { Index as Link } from "../../atom/link";
import { Index as Title } from "../../atom/title/index";
import { Index as Copy } from "../../atom/copywrite/index";
import { LogoWithTypography } from "../../molecules/LogoWithTypography/LogoWithTypography";

import { StyledFooter, StyledFooterInner, StyledUl, StyledLi } from "./Styles";

export const Footer: VFC = () => {
  return (
    <StyledFooter>
      <StyledFooterInner>
        <Link to="/">
          <LogoWithTypography />
        </Link>

        <div>
          <Title headline="h4">About</Title>
          <StyledUl>
            <StyledLi>
              <Link to="/about">About</Link>
            </StyledLi>
            <StyledLi>
              <Link to="/FHDXGhKCaOWFFvIujnZBRoH67EL2/articles/elzM6mxGabV8URq8lDoe">
                記事の書き方
              </Link>
            </StyledLi>
          </StyledUl>
        </div>

        <div>
          <Title headline="h4">Links</Title>
          <StyledUl>
            <StyledLi>
              <a
                href="https://twitter.com/_syoyamamoto_"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </StyledLi>
            <StyledLi>
              <a
                href="https://github.com/shouyamamoto/review-collection"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </StyledLi>
          </StyledUl>
        </div>
      </StyledFooterInner>

      <Copy>&copy; Review Collection 2021</Copy>
    </StyledFooter>
  );
};
