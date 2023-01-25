import { render, screen } from "@testing-library/react";

import PlaylistEntry from "./PlaylistEntry";

test("it should display instruction test", () => {
  render(<PlaylistEntry />);
  const instructions = screen.queryByText(
    "Go to your Release Radar playlist in Spotify and click “Share” > “Copy link to playlist”. Paste the link into the box below."
  );
  expect(instructions).toBeVisible();
});

test("it should have a text field", () => {
  render(<PlaylistEntry />);
  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
});

test("it should have a submit button", () => {
  render(<PlaylistEntry />);
  const button = screen.getByRole("button");
  expect(button).toBeVisible();
});
