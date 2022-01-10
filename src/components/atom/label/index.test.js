import { render, screen, cleanup } from "@testing-library/react"
import { Index } from "./index"

describe("Rendering-component", () => {
  it("Should render label elements correctly", () => {
    render(<Index>Label</Index>);
    expect(screen.getByText("Label")).toBeTruthy();
    expect(screen.queryByText("Labell")).toBeNull();
  })
})
