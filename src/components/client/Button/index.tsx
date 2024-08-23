import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

type ButtonProps = {
  isLoading?: boolean;
} & MuiButtonProps;

export default function Button(props: ButtonProps) {
  const { children, isLoading, ...rest } = props;

  return (
    <MuiButton
      sx={{
        minHeight: 48,
      }}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <CircularProgress size={20} thickness={6} />}
      {!isLoading && children}
    </MuiButton>
  );
}
