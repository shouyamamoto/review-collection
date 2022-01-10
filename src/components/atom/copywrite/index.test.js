import { render, screen, cleanup } from "@testing-library/react"
import { Index } from "./index"

describe("Rendering-element", () => {
  it("Should render copyWrite elements correctly", () => {
    render(<Index>copywrite</Index>);
    expect(screen.getByText("copywrite")).toBeTruthy();
    expect(screen.queryByText("copyWrite")).toBeNull();
  });
})
