import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "theme";
import { Stack } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Next.js Auth Template",
  description:
    "A robust template for Next.js with integrated authentication and authorization.",
  keywords:
    "Next.js, Auth.js, Authentication, Authorization, Template, Web Development",
  openGraph: {
    type: "website",
    url: "https://nextauth.dannyisadog.com",
    title: "Next.js Auth Template",
    description:
      "A robust template for Next.js with integrated authentication and authorization.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js Auth Template",
      },
    ],
  },
  alternates: {
    canonical: "https://nextauth.dannyisadog.com",
  },
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
      <body>
        <ThemeProvider theme={theme}>
          <Stack
            spacing={2}
            sx={{
              maxWidth: 400,
              margin: "auto",
              px: 2,
              py: 4,
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
