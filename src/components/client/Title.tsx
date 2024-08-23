import { Stack, Typography } from "@mui/material";

interface TitleProps {
  text: string;
}

export default function Title(props: TitleProps) {
  const { text } = props;
  return (
    <Stack height={100} justifyContent="center">
      <Typography variant="h4">{text}</Typography>
    </Stack>
  );
}
