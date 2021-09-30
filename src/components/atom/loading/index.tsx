import { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  width: string;
  height: string;
};

export const index: VFC<Props> = ({ width, height }) => {
  // return <StyledLoadingIcon src={LoadingIcon} width={width} height={height} />;
  return (
    <StyledLoader>
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 50 50"
        xmlSpace="preserve"
      >
        <path
          fill={COLOR.PRIMARY}
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </StyledLoader>
  );
};

const StyledLoader = styled.div`
  text-align: center;
`;
