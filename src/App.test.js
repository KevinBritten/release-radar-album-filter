import { render, screen } from "@testing-library/react";

import App from "./App";

test("it starts displaying the setup screen", () => {
  render(<App />);

  const header = screen.queryByText(
    "Get only the full album releases from your Release Radar."
  );
  expect(header).toBeVisible();
});

test("it displays the results screen on playlist load", () => {
  throw new Error();
});
