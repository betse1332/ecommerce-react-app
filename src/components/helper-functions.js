export const filterProductPrice = (prices, currencyType) => {
  console.log(currencyType);
  const currency = prices.filter(
    (price) => price.currency.symbol === currencyType
  );

  return currency[0];
};
