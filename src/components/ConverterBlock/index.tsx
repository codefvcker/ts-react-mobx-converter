import React, { useState, useReducer, useEffect } from "react";
import { TCoin, TSelectedCoin } from "../../types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import CurrencyStore from "../../stores/currencyStore";
import { observer, inject } from "mobx-react";
import ConverterStore from "../../stores/converterStore";

interface ICryptoBlockProps {
  classes: Record<any, string>;
  currencyStore?: CurrencyStore;
  converterStore?: ConverterStore;
}

type TReducerState = {
  value1: any;
  value2: any;
  inPrice: any;
  outPrice: number;
};

type TSetValueAction = {
  type: string;
  payload: any;
};

type TAction = TSetValueAction;

function reducer(state: TReducerState, action: TAction): TReducerState {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        value2: String(
          (Number(action.payload.value) * state.inPrice) / state.outPrice
        ),
      };
    case "SET_PRICES":
      return {
        ...state,
        inPrice: action.payload.in,
        outPrice: action.payload.out,
      };
    default:
      return state;
  }
}

export const ConverterBlock: React.FC<ICryptoBlockProps> = inject(
  "currencyStore",
  "converterStore"
)(
  observer(({ classes, currencyStore, converterStore }) => {
    const [selectedOutCoin, setSelectedOutCoin] = useState("USD");
    const currencyNames: string[] = currencyStore!.getCoins.map(
      (coin) => coin.name
    );
    const inPrice = converterStore!.getSelectedCoin.price || 0;
    const outPrice =
      Number(
        currencyStore!.getCoins.find((obj) => obj.name === selectedOutCoin)
          ?.price
      ) || 0;
    // currencyStore!.getCoins.find(
    //   (obj) => obj.name === selectedOutCoin
    // )!.price;

    const [state, dispatch] = useReducer(reducer, {
      value1: "",
      value2: "",
      inPrice,
      outPrice,
    });

    // const selectedCoin: TSelectedCoin = converterStore!.getSelectedCoin;

    useEffect(() => {
      dispatch({
        type: "SET_PRICES",
        payload: {
          in: inPrice,
          out: outPrice,
        },
      });
    }, [inPrice, outPrice]);

    const onUpdateField = (name: string, value: string) => {
      dispatch({
        type: "SET_VALUE",
        payload: { name, value },
      });
    };

    const renderCurrencyNames = () => {
      return currencyNames.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ));
    };

    return (
      <Paper className={classes.paper}>
        <div className={classes.inputWrap}>
          <FormControl className={classes.currencyInput}>
            <TextField
              type="number"
              value={state.value1}
              onChange={(e: any) => onUpdateField("value1", e.target.value)}
              label="Sum"
            />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel id="demo-simple-select-helper-label">
              Currency
            </InputLabel>
            <Select value={converterStore?.getSelectedCoin.name || ""}>
              {renderCurrencyNames()}
            </Select>
          </FormControl>
        </div>
        <div className={classes.inputWrap}>
          <FormControl className={classes.currencyInput}>
            <TextField
              // placeholder={state.value1 * 2 + "a"}
              type="number"
              value={state.value2}
              label="Sum"
            />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel id="demo-simple-select-helper-label">
              Currency
            </InputLabel>
            <Select
              onChange={(e) => setSelectedOutCoin(e.target.value as string)}
              value={selectedOutCoin || ""}
            >
              {/* <MenuItem value="USD">USD</MenuItem> */}
              {renderCurrencyNames()}
            </Select>
          </FormControl>
        </div>
        <Typography variant="h5" component="h5">
          2,49 Белорусский рубль
        </Typography>
      </Paper>
    );
  })
);
