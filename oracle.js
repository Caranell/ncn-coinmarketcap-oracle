const axios = require("axios");

const COINMARKETCAP_API_ADDRESS = "https://pro-api.coinmarketcap.com/v2/";
const COINMARKETCAP_API_KEY = "YOUR_API_KEY"

const getTopCurrenciesPrices = async () => {
  const response = await axios.get(
    COINMARKETCAP_API_ADDRESS + "cryptocurrency/quotes/latest",
    {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
      },
      params: {
        slug: "bitcoin,ethereum,solana,xrp,bnb,cardano,tron",
      },
    }
  );

  const obj = response.data.data;
  const keys = Object.keys(obj);

  const tokenData = keys.map((k) => ({
    symbol: obj[k].slug,
    name: obj[k].name,
    price: obj[k].quote.USD.price,
  }));

  console.log(tokenData);
  return tokenData;
};

getTopCurrenciesPrices();

const write = async () => {
  const tokenData = await getTopCurrenciesPrices();
  console.log("Token Data:", tokenData);
};

const run = async () => {
  const interval =
    (Number.parseInt(process.env.INTERVAL ?? "", 10) ||
      Number.parseInt(process.argv[2], 10) ||
      60) * 1000;

  await write();
  setInterval(write, interval);
};

run().catch((e) => {
  console.error("Error", e);
  process.exit(1);
});
