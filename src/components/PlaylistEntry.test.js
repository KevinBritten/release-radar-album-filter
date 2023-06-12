import { render, screen } from "@testing-library/react";

import PlaylistEntry from "./PlaylistEntry";

const loadAlbumsMock = () => {};

test("it should display instruction test", () => {
  render(<PlaylistEntry loadAlbums={loadAlbumsMock} />);
  const instructions = screen.queryByText(
    "Go to your Release Radar playlist in Spotify and click “Share” > “Copy link to playlist”. Paste the link into the box below."
  );
  expect(instructions).toBeVisible();
});

test("it should have a text field", () => {
  render(<PlaylistEntry loadAlbums={loadAlbumsMock} />);
  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
});

test("it should have a submit button", () => {
  render(<PlaylistEntry loadAlbums={loadAlbumsMock} />);
  const button = screen.getByRole("button");
  expect(button).toBeVisible();
});

test("it should have a checkbox to remember the playlist", () => {
  render(<PlaylistEntry loadAlbums={loadAlbumsMock} />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeVisible();
  const label = screen.getByText("Remember my playlist");
  expect(label).toBeVisible();
});
