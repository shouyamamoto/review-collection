import { VFC } from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { DEVICE } from "../../Themes/Device";
import { ProfileEditArea } from "../organisms/ProfileEditArea";

export const ProfileEdit: VFC = () => {
  return (
    <StyledProfileEditArea>
      <ProfileEditArea />
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledProfileEditArea>
  );
};

const StyledProfileEditArea = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    padding: 120px 0;
  }
`;
