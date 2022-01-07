import { render, screen, cleanup } from "@testing-library/react"
import { Index } from "./index"

afterEach(() => cleanup())

describe("Rendering-component", () => {
  it("Rendering default title", () => {
    render(<Index>Title</Index>);
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
  })
  it("Rendering title h2", () => {
    render(<Index headline="h2">Title h2</Index>);
    expect(screen.getByText("Title h2")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
  })
  it("Rendering title h3", () => {
    render(<Index headline="h3">Title h3</Index>);
    expect(screen.getByText("Title h3")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
  })
  it("Rendering title h4", () => {
    render(<Index headline="h4">Title h4</Index>);
    expect(screen.getByText("Title h4")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
  })
  it("Rendering title h5", () => {
    render(<Index headline="h5">Title h5</Index>);
    expect(screen.getByText("Title h5")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
  })
  it("Rendering title h6", () => {
    render(<Index headline="h6">Title h6</Index>);
    expect(screen.getByText("Title h6")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
  })
})
