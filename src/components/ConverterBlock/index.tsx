import React from "react";
import { TCoin } from "../../types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

interface ICryptoBlockProps {
  classes: Record<any, string>;
}

export const ConverterBlock: React.FC<ICryptoBlockProps> = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.inputWrap}>
        <FormControl className={classes.currencyInput}>
          <TextField label="Sum" />
        </FormControl>
        <FormControl className={classes.currencyType}>
          <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
          <Select value={10}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.inputWrap}>
        <FormControl className={classes.currencyInput}>
          <TextField label="Sum" />
        </FormControl>
        <FormControl className={classes.currencyType}>
          <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
          <Select value={10}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Typography variant="h5" component="h5">
        2,49 Белорусский рубль
      </Typography>
    </Paper>
  );
};
