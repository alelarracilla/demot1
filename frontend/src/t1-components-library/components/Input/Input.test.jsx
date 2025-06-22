import { render, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import { trackComponentInteraction } from "../tracking";

jest.mock("../tracking", () => ({
  trackComponentInteraction: jest.fn(),
}));

describe("Input component", () => {
  const labelText = "Nombre";
  const placeholderText = "Escribe aquí...";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label if provided", () => {
    const { getByText } = render(<Input label={labelText} />);
    expect(getByText(labelText)).toBeInTheDocument();
  });

  it("renders input with correct type", () => {
    const { getByPlaceholderText } = render(
      <Input type="email" placeholder={placeholderText} />
    );
    const input = getByPlaceholderText(placeholderText);
    expect(input).toHaveAttribute("type", "email");
  });

  it("applies correct class for error state", () => {
    const { container } = render(<Input state="error" />);
    expect(container.querySelector("input")?.className).toMatch(/input--error/);
  });

  it("applies correct class for success state", () => {
    const { container } = render(<Input state="success" />);
    expect(container.querySelector("input")?.className).toMatch(/input--success/);
  });

  it("applies correct class and disables input if disabled", () => {
    const { getByRole } = render(<Input disabled />);
    const input = getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input.className).toMatch(/input--disabled/);
  });

  it("calls onFocus and tracks interaction if not disabled", () => {
    const onFocusMock = jest.fn();
    const { getByRole } = render(<Input onFocus={onFocusMock} />);
    const input = getByRole("textbox");

    fireEvent.focus(input);

    expect(onFocusMock).toHaveBeenCalledTimes(1);
    expect(trackComponentInteraction).toHaveBeenCalledWith({
      name: "Input",
      variant: "text",
      action: "focus",
    });
  });

  it("does not track interaction if input is disabled", () => {
    const onFocusMock = jest.fn();
    const { getByRole } = render(<Input onFocus={onFocusMock} disabled />);
    const input = getByRole("textbox");

    fireEvent.focus(input);

    expect(onFocusMock).toHaveBeenCalled();
    expect(trackComponentInteraction).not.toHaveBeenCalled();
  });
});
