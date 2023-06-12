import { render, screen } from "@testing-library/react";

import SetupWrapper from "./SetupWrapper";

const loadAlbumsMock = () => {};

test("it should display a message at the top", () => {
  render(<SetupWrapper loadAlbums={loadAlbumsMock} />);
  const header = screen.queryByText(
    "Get only the full album releases from your Release Radar."
  );
  expect(header).toBeVisible();
});

test("it should render a component with a continue button", () => {
  render(<SetupWrapper loadAlbums={loadAlbumsMock} />);
  const button = screen.queryByText("Continue");
  expect(button).toBeVisible();
});
