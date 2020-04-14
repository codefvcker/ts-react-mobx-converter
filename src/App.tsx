import React, { useState, useEffect } from "react";
import axios from "axios";
import { TCoin } from "./types";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { CryptoTable, ConverterBlock } from "./components";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();
  // const [allCoins, setAllCoins] = useState<TCoin[]>([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
  //     )
  //     .then(({ data }) => {
  //       const coins: TCoin[] = data.Data.map((coin: any) => {
  //         const obj: TCoin = {
  //           id: coin.CoinInfo.Id,
  //           name: coin.CoinInfo.Name,
  //           fullName: coin.CoinInfo.FullName,
  //           price: coin.RAW.USD.PRICE.toFixed(2),
  //           imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
  //           volume24Hour: coin.RAW.USD.VOLUME24HOUR.toFixed(4),
  //         };
  //         return obj;
  //       });
  //       setAllCoins(coins);
  //       console.log(coins);
  //     });
  // }, []);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CryptoTable classes={classes} />
        </Grid>
        <Grid item xs={4}>
          <ConverterBlock classes={classes} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
