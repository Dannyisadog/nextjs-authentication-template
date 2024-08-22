import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonProps = MuiButtonProps;

export default function Button(props: ButtonProps) {
  const { ...rest } = props;
  return (
    <MuiButton
      sx={{
        minHeight: 48,
      }}
      {...rest}
    />
  );
}
