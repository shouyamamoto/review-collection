import { render, screen, cleanup } from "@testing-library/react"
import "jest-styled-components";
import { ErrorMsg } from "./ErrorMsg"
import { COLOR } from "../../../Themes/Color";

afterEach(() => cleanup());

describe('Rendering component', () => {
  it("Should render ErrorMsg component", () => {
    const isValid = jest.fn();
    render(<ErrorMsg isValid={isValid}>ErrorMessage</ErrorMsg>);
    expect(screen.getByText("ErrorMessage")).toBeTruthy();
    expect(screen.queryByText("errorMessage")).toBeNull();
  })
  it("it applies default styles", () => {
    const isValid = jest.fn();
    render(<ErrorMsg isValid={isValid.mockReturnValue(false)}>ErrorMessage</ErrorMsg>);
    expect(screen.getByText("ErrorMessage")).toHaveStyleRule("color", COLOR.DANGER)
  })
  it("it applies styles according to passed props", () => {
    const isValid = jest.fn();
    render(<ErrorMsg isValid={isValid.mockReturnValue(true)}>ErrorMessage</ErrorMsg>);
    expect(screen.getByText("ErrorMessage")).toHaveStyleRule("color", COLOR.GRAY)
  })
})
