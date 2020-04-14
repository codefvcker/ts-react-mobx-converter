import React, { useEffect } from "react";
import { TCoin, TCoinDiff } from "../../types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { observer, inject } from "mobx-react";
import CurrencyStore from "../../stores/currencyStore";
import ConverterStore from "../../stores/converterStore";

interface ICryptoTableProps {
  // allCoins: TCoin[];
  // classes: Record<any, string>;
  classes: any;
  currencyStore?: CurrencyStore;
  converterStore?: ConverterStore;
}

export const CryptoTable = inject(
  "currencyStore",
  "converterStore"
)(
  observer(
    ({
      // allCoins,
      classes,
      currencyStore,
      converterStore,
    }: ICryptoTableProps) => {
      const allCoins: TCoin[] = currencyStore!.getCoins || [];
      const diffObj: TCoinDiff = currencyStore!.getDiffObj;

      useEffect(() => {
        currencyStore!.fetchCoins();
        setInterval(() => {
          currencyStore!.fetchCoins();
        }, 30 * 1000);
      }, []);

      const onClickRow = (coin: TCoin) => {
        converterStore!.setSelectedCoin(coin);
      };

      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                ​<TableCell align="left">FullName</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">volume24hour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!allCoins.length
                ? "Loading..."
                : allCoins.map((coin) => {
                    return (
                      <TableRow
                        className={classes.rowCurrency}
                        hover
                        key={coin.id}
                        onClick={() => onClickRow(coin)}
                      >
                        <TableCell>
                          <img
                            className={classes.coinImg}
                            src={coin.imageUrl}
                            alt={coin.name}
                          />
                        </TableCell>
                        <TableCell align="left">{coin.fullName}</TableCell>
                        <TableCell align="left">{coin.name}</TableCell>
                        <TableCell
                          className={classes[diffObj[coin.name]]}
                          align="left"
                        >
                          {coin.price}
                        </TableCell>
                        <TableCell align="left">{coin.volume24Hour}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  )
);
