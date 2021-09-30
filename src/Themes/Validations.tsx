export const VALIDATIONS = {
  username: {
    maxLength: 15,
    minLength: 2,
    errorMessage: "※ユーザー名は2文字以上15文字以下にしてください。",
  },
  comment: {
    maxLength: 100,
    errorMessage: "※100文字以下にしてください。",
  },
  blogUrl: {
    minLength: 0,
    regex: /^https?:\/\//,
    errorMessage: "※httpまたはhttpsから始まるURLを入力してください。",
  },
  postTitle: {
    maxLength: 50,
    minLength: 2,
    errorMessage: "※記事のタイトルは2文字以上50文字以下にしてください。",
  },
  postText: {
    minLength: 0,
    errorMessage: "※記事の内容を入力してください。",
  },
};

export const isPostTitleValid = (title: string) => {
  return (
    title.length <= VALIDATIONS.postTitle.maxLength &&
    title.length >= VALIDATIONS.postTitle.minLength
  );
};

export const isPostTextValid = (text: string) => {
  return text.length > VALIDATIONS.postText.minLength;
};

export const isValidPost = (title: string, text: string) => {
  return isPostTitleValid(title) && isPostTextValid(text);
};

export const isUserNameValid = (username: string) => {
  return (
    username.length <= VALIDATIONS.username.maxLength &&
    username.length >= VALIDATIONS.username.minLength
  );
};

export const isCommentValid = (comment: string) => {
  return comment.length <= VALIDATIONS.comment.maxLength;
};

export const isBlogUrlValid = (blogUrl: string) => {
  return (
    VALIDATIONS.blogUrl.minLength === blogUrl.length ||
    VALIDATIONS.blogUrl.regex.test(blogUrl)
  );
};

export const isValidProfile = (
  username: string,
  comment: string,
  blogUrl: string
) => {
  return (
    isUserNameValid(username) &&
    isCommentValid(comment) &&
    isBlogUrlValid(blogUrl)
  );
};
