import { render, screen } from "@testing-library/react"
import { Index } from "./index"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe("Rendering-component", () => {
  it("Should render Link component", () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Index to="/#">Link</Index>
      </Router>
    );
    expect(screen.getByText("Link")).toBeTruthy();
    expect(screen.queryByText("Links")).toBeNull();
  })
});
