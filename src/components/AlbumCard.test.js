import { render, screen } from "@testing-library/react";

import AlbumCard from "./AlbumCard";

const testData = [
  {
    name: "album name",
    artist: "artist 1, artist 2",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b27326597c053b38c9cf93f8f3a9",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d0000485126597c053b38c9cf93f8f3a9",
        width: 64,
      },
    ],
    externalUrl: "https://open.spotify.com/track/4OEnpg5ubhg6OQ4M2ZjtsL",
    trackCount: 11,
    genre: "Rock, Jazz",
  },
];

test("it should display the artist's names", () => {
  const data = testData[0];
  render(<AlbumCard album={data} />);
  const artist = screen.queryByText(data.artist);
  expect(artist).toBeVisible();
});

test("it should display the album name", () => {
  const data = testData[0];
  render(<AlbumCard album={data} />);
  const album = screen.queryByText(data.name);
  expect(album).toBeVisible();
});

test("it should display the album's genre", () => {
  const data = testData[0];
  render(<AlbumCard album={data} />);
  const genre = screen.queryByText(data.genre);
  expect(genre).toBeVisible();
});

test("it should display the number of tracks in the album", () => {
  const data = testData[0];
  render(<AlbumCard album={data} />);
  const trackCount = screen.queryByText(data.trackCount);
  expect(trackCount).toBeVisible();
});

test("it should display the album image", () => {
  const data = testData[0];
  render(<AlbumCard album={data} />);
  expect(
    screen.getByRole("img", {
      name: `Album artwork for ${data.name} by ${data.artist}`,
    })
  ).toHaveAttribute("src", data.images[0].url);
});

test("it should have a button to open in spotify", () => {
  const data = testData[0];
  render(<AlbumCard album={data} />);
  expect(
    screen.getByRole("link", { href: data.externalUrl })
  ).toBeInTheDocument();
});
