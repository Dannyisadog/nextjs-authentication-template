import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "theme";
import { Stack } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Next.js auth template",
  description: "A template for Next.js with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta property="og:title" content="Next.js Auth Template" />
      <meta property="og:image" content="/og-image.png" />
      <body>
        <ThemeProvider theme={theme}>
          <Stack
            spacing={2}
            sx={{
              maxWidth: 400,
              margin: "auto",
              px: 2,
              pt: "100px",
            }}
            justifyContent="center"
          >
            {children}
            <SpeedInsights />
            <Analytics />
          </Stack>
        </ThemeProvider>
      </body>
    </html>
  );
}
