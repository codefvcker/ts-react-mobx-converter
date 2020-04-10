import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    inputWrap: {
      margin: "10px 0",
    },
    currencyInput: {
      minWidth: "65%",
      marginRight: 10,
    },
    currencyType: {
      minWidth: "30%",
    },
    table: {
      minWidth: 650,
    },
    coinImg: {
      width: 20,
      height: 20,
      borderRadius: 25,
    },
  })
);
