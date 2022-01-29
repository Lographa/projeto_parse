const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

//configuração da porta
app.listen(3000, function () {
    console.log(`Rodando na porta 3000`);
});

//abri o browser
puppeteer.launch().then(async function(browser) {
    const page = await browser.newPage();
    await page.goto('https://www.fflogs.com/reports/qP7hr1nFy3dx2ZQw#fight=3&type=damage-done');

    await page.screenshot({path: 'fflog-website.png'});

    //fecha
    await browser.close();
});