import styled from "styled-components";

import { DEVICE } from "../../../Themes/Device";

export const StyledProfileEditArea = styled.main`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
  }
`;
