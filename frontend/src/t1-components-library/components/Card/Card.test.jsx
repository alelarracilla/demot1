import { render, fireEvent } from "@testing-library/react";
import { Card } from "./Card";
import { trackComponentInteraction } from "../tracking";

jest.mock("../tracking", () => ({
  trackComponentInteraction: jest.fn(),
}));

describe("Card component", () => {
  const headerText = "Card Header";
  const bodyText = "Card Body";
  const footerText = "Card Footer";
  const imageUrl = "https://example.com/image.jpg";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all sections if props are provided", () => {
    const { getByText, getByAltText } = render(
      <Card
        image={imageUrl}
        header={<h1>{headerText}</h1>}
        body={<p>{bodyText}</p>}
        footer={<div>{footerText}</div>}
      />
    );

    expect(getByText(headerText)).toBeInTheDocument();
    expect(getByText(bodyText)).toBeInTheDocument();
    expect(getByText(footerText)).toBeInTheDocument();
    expect(getByAltText("Card image")).toHaveAttribute("src", imageUrl);
  });

  it("renders only provided sections", () => {
    const { queryByAltText, queryByText } = render(
      <Card header={<h1>{headerText}</h1>} />
    );

    expect(queryByText(headerText)).toBeInTheDocument();
    expect(queryByAltText("Card image")).toBeNull();
    expect(queryByText(bodyText)).toBeNull();
    expect(queryByText(footerText)).toBeNull();
  });

  it("calls trackComponentInteraction on click", () => {
    const { container } = render(<Card borderStyle="dashed" />);
    fireEvent.click(container.firstChild);

    expect(trackComponentInteraction).toHaveBeenCalledWith({
      name: "Card",
      variant: "dashed",
      action: "click",
    });
  });
});
