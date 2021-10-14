import { VFC } from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { useParams, Redirect } from "react-router-dom";

import { DEVICE } from "../../Themes/Device";
import { ProfileEditArea } from "../organisms/ProfileEditArea";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const ProfileEdit: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = useParams<{ userId: string }>();

  if (currentUser.uid !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <StyledProfileEditArea>
      <ProfileEditArea />
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledProfileEditArea>
  );
};

const StyledProfileEditArea = styled.main`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
  }
`;
