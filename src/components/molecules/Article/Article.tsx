import { VFC } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

import { index as Icon } from "../../atom/icon";
import { index as Link } from "../../atom/link";
import { NameWithTimestamp } from "../NameWithTimestamp/NameWithTimestamp";

import {
  StyledArticle,
  StyledIconWithName,
  StyledArticleTitle,
  StyledLabels,
  StyledLabel,
} from "./Styles";

type Props = {
  postId: string;
  uid: string;
  username: string;
  avatar: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
  labels: string[];
};

const ShowLabelLength = 2;

export const Article: VFC<Props> = ({
  postId,
  uid,
  username,
  avatar,
  title,
  timestamp,
  likedUsers,
  labels,
}) => {
  const history = useHistory();

  return (
    <StyledArticle>
      <Link to={`/${uid}/articles/${postId}`}>
        <StyledArticleTitle>{title}</StyledArticleTitle>
      </Link>
      <StyledLabels>
        {labels.map((label, index) => (
          <>
            {index < ShowLabelLength && (
              <StyledLabel
                key={index}
                onClick={() => history.push(`/topics?search=${label}`)}
              >
                {label}
              </StyledLabel>
            )}
          </>
        ))}
      </StyledLabels>
      <StyledIconWithName>
        <Link to={`/${uid}`}>
          <Icon src={avatar} alt={username} width="20" height="20" />
        </Link>
        <Link to={`/${uid}`}>
          <NameWithTimestamp
            username={username}
            timestamp={timestamp && format(timestamp, "yyyy-MM-dd")}
            likedUsers={likedUsers}
          />
        </Link>
      </StyledIconWithName>
    </StyledArticle>
  );
};
