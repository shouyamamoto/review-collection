import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Index } from "./index"

afterEach(() => cleanup());

describe("Rendering-elements", () => {
  it("Should render input elements correctly", () => {
    render(<Index />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  })
})

describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<Index />);
    const inputValue = screen.getByRole("textbox");
    userEvent.type(inputValue, "");
    expect(inputValue.value).toBe("");
  })
})
