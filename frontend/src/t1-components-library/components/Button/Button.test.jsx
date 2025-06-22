import { render, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { trackComponentInteraction } from "../tracking";


jest.mock("../tracking", () => ({
  trackComponentInteraction: jest.fn(),
}));

describe("Button component", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    const { getByRole } = render(<Button onClick={onClickMock}>Click me</Button>);
    const button = getByRole("button");
    expect(button).toHaveTextContent("Click me");
    expect(button).not.toBeDisabled();
  });

  it("renders with loading state", () => {
    const { getByRole } = render(<Button state="loading">Click me</Button>);
    const button = getByRole("button");
    expect(button).toHaveTextContent("Loading...");
    expect(button).toBeDisabled();
  });

  it("renders with disabled state", () => {
    const { getByRole } = render(<Button state="disabled">Click me</Button>);
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick or tracking if disabled", () => {
    const { getByRole } = render(<Button state="disabled" onClick={onClickMock}>Click me</Button>);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
    expect(trackComponentInteraction).not.toHaveBeenCalled();
  });

  it("calls onClick and tracking when clicked", () => {
    const { getByRole } = render(<Button onClick={onClickMock}>Click me</Button>);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(trackComponentInteraction).toHaveBeenCalledWith({
      name: "Button",
      variant: "primary",
      action: "click",
    });
  });

  it("renders with icon if provided", () => {
    const icon = <svg data-testid="icon" />;
    const { getByTestId } = render(<Button icon={icon}>With Icon</Button>);
    expect(getByTestId("icon")).toBeInTheDocument();
  });
});
