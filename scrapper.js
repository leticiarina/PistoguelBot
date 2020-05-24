const axios = require("axios");
const puppeteer = require("puppeteer");

const getAccessToken = async (page) => {
  page.on("request", (interceptedRequest) => {
    var data = {
      method: "POST",
      postData: "grant_type=password&ligacaoId=16315&dv=58&typeAuth=3",
    };

    interceptedRequest.continue(data);
  });

  // Navigate, trigger the intercept, and resolve the response
  const response = await page.goto(
    "https://agenciavirtualssb.cebi.com.br/saocarlos/api/token"
  );
  const responseBody = await response.text();
  page.removeAllListeners("request");
  const tokenResponse = JSON.parse(responseBody);
  return tokenResponse["access_token"];
};

const getWaterAccounts = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--tls-min-v1.0"],
    headless: false,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  const token = await getAccessToken(page);

  page.on("request", (interceptedRequest) => {
    const headers = interceptedRequest.headers();
    headers["Bearer"] = token;
    headers["Authorization"] = `Bearer ${token}`;
    interceptedRequest.continue({ headers });
  });

  // Navigate, trigger the intercept, and resolve the response
  const response = await page.goto(
    "https://agenciavirtualssb.cebi.com.br/saocarlos/home.html#/conta/lista"
  );
};

getWaterAccounts();

module.exports = {
  getWaterAccounts,
};
