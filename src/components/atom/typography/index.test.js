import { render, screen, cleanup } from "@testing-library/react"
import "jest-styled-components";
import { COLOR } from "../../../Themes/Color";
import { Index } from "./index"

afterEach(() => cleanup())

describe("Render-component", () => {
  it("Should render typography component", () => {
    render(<Index>Typography</Index>);
    expect(screen.getByText("Typography")).toBeTruthy();
  })

  it("Behavior when default props are passed", () => {
    render(<Index>Typography</Index>);
    expect(screen.getByText("Typography")).toHaveStyleRule("font-size", "16px");
    expect(screen.getByText("Typography")).toHaveStyleRule("font-weight", "normal");
    expect(screen.getByText("Typography")).toHaveStyleRule("margin", "none");
    expect(screen.getByText("Typography")).toHaveStyleRule("color", `${COLOR.BLACK}`);
  })

  it("Behavior when font-size props are passed", () => {
    render(<Index size="20px">Typography</Index>);
    expect(screen.getByText("Typography")).toHaveStyleRule("font-size", "20px");
  })

  it("Behavior when font-weight props are passed", () => {
    render(<Index weight="bold">Typography</Index>);
    expect(screen.getByText("Typography")).toHaveStyleRule("font-weight", "bold");
  })
  it("Behavior when margin props are passed", () => {
    render(<Index margin="20px auto">Typography</Index>);
    expect(screen.getByText("Typography")).toHaveStyleRule("margin", "20px auto");
  })
  it("Behavior when color props are passed", () => {
    render(<Index color="red">Typography</Index>);
    expect(screen.getByText("Typography")).toHaveStyleRule("color", "red");
  })
})
