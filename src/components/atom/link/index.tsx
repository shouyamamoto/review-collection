import React, { VFC } from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
};

export const index: VFC<Props> = ({ to, children }) => {
  return <Link to={to}>{children}</Link>;
};
