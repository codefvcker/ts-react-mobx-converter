import axios from "axios";
import { TCoin, TCoinDiff } from "./../types/index";
import { observable, computed, action } from "mobx";

import stores from '../stores'

class CurrencyStore {
  @observable private allCoins: TCoin[] = [];
  @observable private diffObj: TCoinDiff = {};

  @computed
  get getCoins() {
    return this.allCoins;
  }

  @computed
  get getDiffObj() {
    return this.diffObj;
  }

  @action
  setItems = (coins: TCoin[]): void => {
    this.diffObj = this.diffCurrencies(this.allCoins, coins).reduce(
      (initObj: TCoinDiff, obj: TCoin) => {
        const newObj: TCoin = coins.find((o) => o.name === obj.name)!;
        const oldObj: TCoin = this.allCoins.find(
          (itemObj) => itemObj.name === newObj.name
        )!;
        const color: string =
          newObj.price === oldObj.price
            ? ""
            : newObj.price > oldObj.price
            ? "green"
            : "red";

        initObj[newObj.name] = color;

        return initObj;
      },
      {}
    );
    this.allCoins = coins;
    setTimeout(() => {
      this.diffObj = {};
    }, 5000);
  };

  @action
  fetchCoins = () => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(({ data }) => {
        const coins: TCoin[] = data.Data.map((coin: any) => {
          const obj: TCoin = {
            id: coin.CoinInfo.Id,
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            price: coin.RAW.USD.PRICE.toFixed(2),
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            volume24Hour: coin.RAW.USD.VOLUME24HOUR.toFixed(4),
          };
          return obj;
        });
        this.setItems(coins);
        stores.converterStore.setSelectedCoin(coins[0])
      });
  };

  diffCurrencies(arr1: TCoin[], arr2: TCoin[]) {
    return arr1.filter((obj, index) => obj.price !== arr2[index].price);
  }

  // constructor(allCoins: TCoin[]) {
  //   this.allCoins = allCoins;
  // }
}

export default CurrencyStore;
