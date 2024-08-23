import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface TitleProps {
  text: string;
  hasGoBack?: boolean;
}

export default function Title(props: TitleProps) {
  const { text, hasGoBack } = props;
  return (
    <Stack height={100} justifyContent="center">
      <Stack spacing={2}>
        {hasGoBack && (
          <Link href="/signin">
            <ArrowBackIosNewIcon />
          </Link>
        )}
        <Typography variant="h4">{text}</Typography>
      </Stack>
    </Stack>
  );
}
