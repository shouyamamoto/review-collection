import { useHistory } from "react-router";

import { Presenter } from "./Presenter";

export const Page404 = () => {
  const history = useHistory();
  const onClickTop = () => {
    history.push("/");
  };

  return <Presenter onClickTop={onClickTop} />;
};
