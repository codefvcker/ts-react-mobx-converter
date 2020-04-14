// export { default as converterStore } from "./converterStore";
// export { default as currencyStore } from "./currencyStore";

import ConverterStore from "./converterStore";
import CurrencyStore from "./currencyStore";

const stores = {
  currencyStore: new CurrencyStore(),
  converterStore: new ConverterStore(),
};

export default stores;
