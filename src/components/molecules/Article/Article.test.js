import { screen, render, cleanup } from "@testing-library/react"
import { Article } from "./Article"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe("Rendering-Article", () => {
  it("Should render Article component", () => {
    const history = createMemoryHistory()
    const dummyUserData = {
      uid: "userId",
      username: "username",
      avatar: "avatar.jpg",
    }
    const dummyArticleData = {
      title: "testTitle",
      postId: "testId",
      labels: ["React", "Anguler",],
      timestamp: "Thu Nov 25 2021 00:12:13 GMT+0900 (日本標準時)",
      likedUsers: ["user1", "user2"]
    }
    render(
      <Router history={history}>
        <Article
          uid={dummyUserData.uid}
          avatar={dummyUserData.avatar}
          postId={dummyArticleData.postId}
          labels={dummyArticleData.labels}
          likedUsers={dummyArticleData.likedUsers}
          title={dummyArticleData.title}
        />
      </Router>
    );
    const articleLabels = screen.getAllByRole("listitem").map(ele => ele.textContent);
    const dummyLabels = dummyArticleData.labels.map((ele, index) => index < 2 && ele);
    expect(articleLabels).toEqual(dummyLabels);
  })
})
