export type TCoin = {
  id: number;
  name: string;
  fullName: string;
  price: number;
  imageUrl: string;
  volume24Hour: number;
};

export type TCoinDiff = {
  [key: string]: string;
};

export type TSelectedCoin = {
  name: string;
  price: number;
};
