import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { PrimaryButton } from "./PrimaryButton"
import { RegisterButton } from "./RegisterButton"
import { SignInButton } from "./SignInButton"

afterEach(() => cleanup());


describe("Rendering-buttons", () => {
  it("Should render PrimaryButton elements correctly", () => {
    const onClick = jest.fn();
    render(<PrimaryButton onClick={onClick}>PrimaryButton</PrimaryButton>);
    userEvent.click(screen.getByTestId("primaryButton"));
    expect(screen.getByText("PrimaryButton")).toBeTruthy();
    expect(screen.queryByText("PrimaryButtonn")).toBeNull();
    expect(screen.getByTestId("primaryButton")).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  })

  it("Should render RegisterButton elements correctly", () => {
    const isUserNameValid = jest.fn();
    const onClick = jest.fn()
    render(<RegisterButton onClick={onClick} isUserNameValid={isUserNameValid}>Register</RegisterButton>);
    userEvent.click(screen.getByTestId("registerButton"));
    expect(screen.getByTestId("registerButton")).toHaveProperty("disabled");
    expect(screen.getByText("Register")).toBeTruthy();
    expect(screen.queryByText("Registerrrrrr")).toBeNull();
    expect(screen.getByTestId("registerButton")).toBeTruthy();
  })

  it("Should render SignInButton elements correctly", () => {
    const onClick = jest.fn();
    render(<SignInButton onClick={onClick}>SignInButton</SignInButton>);
    userEvent.click(screen.getByTestId("signInButton"));
    expect(screen.getByText("SignInButton")).toBeTruthy();
    expect(screen.queryByText("SignInButtonn")).toBeNull();
    expect(screen.getByTestId("signInButton")).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  })
})

describe("Disabled is enabled, do nothing", () => {
  it("PrimaryButton does nothing when disabled", () => {
    const onClick = jest.fn();
    render(<PrimaryButton onClick={onClick} disabled>PrimaryButton</PrimaryButton>);
    userEvent.click(screen.getByTestId("primaryButton"));
    expect(onClick).toHaveBeenCalledTimes(0);
  })

  it("RegisterButton does nothing when disabled", () => {
    const isUserNameValid = jest.fn();
    const onClick = jest.fn()
    render(<RegisterButton onClick={onClick} isUserNameValid={isUserNameValid}>Register</RegisterButton>);
    userEvent.click(screen.getByTestId("registerButton"));
    expect(onClick).toHaveBeenCalledTimes(0);
  })
})
