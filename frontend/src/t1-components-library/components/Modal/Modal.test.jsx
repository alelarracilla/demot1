import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import { trackComponentInteraction } from "../tracking";

jest.mock("../tracking", () => ({
  trackComponentInteraction: jest.fn(),
}));

describe("Modal component", () => {
  const headerContent = <h2>Modal Title</h2>;
  const bodyContent = <p>Modal body content</p>;
  const footerContent = <button>Close</button>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render if isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={jest.fn()} />
    );
    expect(queryByText("Modal Title")).not.toBeInTheDocument();
  });

  it("renders content when isOpen is true", () => {
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        header={headerContent}
        body={bodyContent}
        footer={footerContent}
      />
    );
    expect(getByText("Modal Title")).toBeInTheDocument();
    expect(getByText("Modal body content")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
  });

  it("calls trackComponentInteraction when opened", () => {
    render(<Modal isOpen={true} onClose={jest.fn()} size="large" />);
    expect(trackComponentInteraction).toHaveBeenCalledWith({
      name: "Modal",
      variant: "large",
      action: "open",
    });
  });

  it("calls onClose when overlay is clicked", () => {
    const onCloseMock = jest.fn();
    const { container } = render(<Modal isOpen={true} onClose={onCloseMock} />);
    const overlay = container.firstChild;

    fireEvent.click(overlay);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <Modal isOpen={true} onClose={onCloseMock} header="Header text" />
    );
    const closeButton = getByRole("button");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
