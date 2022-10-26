export const filterProductPrice = (prices, currencyType) => {
  
  console.log("🚀 ~ file: helper-functions.js ~ line 3 ~ filterProductPrice ~ currencyType", currencyType)
  const currency = prices.filter(
    (price) => price.currency.symbol === currencyType
  );
    console.log("🚀 ~ file: helper-functions.js ~ line 7 ~ filterProductPrice ~ currency", currency[0].amount)
    
  return currency[0];
};

export const calculateTax = (totalPrice) => {
  const tax = totalPrice * 0.21;
  

  return tax;
};

export const stringToHtml= (inputString)=>{
  var parser = new DOMParser();
	var doc = parser.parseFromString(inputString, 'text/html');
	return doc.body;
}