import { VFC } from "react";
import styled from "styled-components";

import { COLOR } from "../../Themes/Color";
import { index as Link } from "../atom/link";
import { index as Title } from "../atom/title/index";
import { index as Copy } from "../atom/copywrite/index";
import { LogoWithTypography } from "../molecules/LogoWithTypography";
import { DEVICE } from "../../Themes/Device";

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
              <Link to="/FHDXGhKCaOWFFvIujnZBRoH67EL2/articles/jnhS3cUadhxLLnDCLmJI">
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

const StyledFooter = styled.footer`
  padding: 80px 0 40px;
  border-top: 1px solid ${COLOR.BACKGROUND};

  @media ${DEVICE.laptop} {
    padding: 60px 0 20px;
  }
`;

const StyledFooterInner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px 0;

  @media ${DEVICE.tabletL} {
    width: 70%;
    max-width: 1200px;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0 40px;
  }
`;

const StyledUl = styled.ul`
  margin-top: 14px;
`;

const StyledLi = styled.li`
  margin: 0.6rem 0;
  font-size: 14px;
`;
