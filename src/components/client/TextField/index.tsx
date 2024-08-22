import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

type TextFieldProps = MuiTextFieldProps;

export default function TextField(props: TextFieldProps) {
  const { ...rest } = props;
  return (
    <MuiTextField
      sx={{
        "&.MuiTextField-root": {
          borderRadius: 1,
          backgroundColor: "transparent",
        },
      }}
      {...rest}
    />
  );
}
