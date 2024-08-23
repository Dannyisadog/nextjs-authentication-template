import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import GitHubIcon from "@mui/icons-material/GitHub";

interface TitleProps {
  text: string;
  hasGoBack?: boolean;
}

export default function Title(props: TitleProps) {
  const { text, hasGoBack } = props;
  return (
    <Stack height={130} justifyContent="center">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          {hasGoBack ? (
            <Link href="/signin">
              <ArrowBackIosNewIcon />
            </Link>
          ) : (
            <Box />
          )}
          <Link
            href="https://github.com/Dannyisadog/nextjs-authjs-template"
            target="_blank"
          >
            <GitHubIcon />
          </Link>
        </Stack>
        <Typography variant="h4">{text}</Typography>
      </Stack>
    </Stack>
  );
}
