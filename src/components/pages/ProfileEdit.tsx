import { VFC } from "react";
import styled from "styled-components";
import { ProfileEditArea } from "../organisms/ProfileEditArea";

export const ProfileEdit: VFC = () => {
  return (
    <StyledProfileEditArea>
      <ProfileEditArea />
    </StyledProfileEditArea>
  );
};

const StyledProfileEditArea = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
`;
