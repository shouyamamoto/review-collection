import { VFC } from "react";
import { Helmet } from "react-helmet";

type Props = {
  title?: string;
  postId?: string;
};

export const Head: VFC<Props> = ({ title, postId }) => {
  return (
    <Helmet>
      {title ? (
        <title>{`${title} | Review Collection`}</title>
      ) : (
        <title>Review Collection</title>
      )}
      <meta name="description" content={title} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
      ></meta>
      {/* OGP ここから */}
      {postId && (
        <meta
          property="og:url"
          content={`https://review-collection-8edce.web.app/articles/${postId}`}
        />
      )}
      {postId ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />
      <meta property="og:site_name" content="Review Collection" />
      <meta
        property="og:image"
        content="https://review-collection-8edce.web.app/images/ogp.png"
      />
      {/* OGP ここまで */}
    </Helmet>
  );
};
