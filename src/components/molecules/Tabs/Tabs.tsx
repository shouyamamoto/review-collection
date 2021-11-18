import { VFC } from "react";

import { StyledTabs, StyledTab } from "./Styles";

export const convertStatus = (key: string) => {
  const mapStatus: { [key: string]: string } = {
    release: "公開中",
    draft: "下書き",
  };
  return mapStatus[key] ?? console.error(`not provided ${key}`);
};

type Props = {
  tabList: string[];
  currentNum: number;
  changeActive: (index: number) => void;
};

export const Tabs: VFC<Props> = ({ tabList, currentNum, changeActive }) => {
  return (
    <StyledTabs>
      {tabList.map(
        (tabItem, index) =>
          convertStatus(tabItem) !== undefined && (
            <StyledTab
              key={tabItem}
              onClick={() => changeActive(index)}
              isActive={currentNum === index}
            >
              {convertStatus(tabItem)}
            </StyledTab>
          )
      )}
    </StyledTabs>
  );
};
