import { TCoin, TSelectedCoin } from "./../types/index";
import { observable, computed, action } from "mobx";

class ConverterStore {
  @observable private selectedCoin: TSelectedCoin = {
    name: "",
    price: 0,
  };

  @computed
  get getSelectedCoin() {
    return this.selectedCoin;
  }

  @action
  setSelectedCoin(coin: TCoin) {
    this.selectedCoin = {
      name: coin.name,
      price: coin.price,
    };
  }

  @action
  setItems = (items: TCoin[]): void => {};

  // constructor(allCoins: TCoin[]) {
  //   this.allCoins = allCoins;
  // }
}

export default ConverterStore;
