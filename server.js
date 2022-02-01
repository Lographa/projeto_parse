const puppeteer = require('puppeteer');
const express = require('express');
const app = express();


//configuração da porta
app.listen(3000, function () {
    console.log(`Rodando na porta 3000`);
});

app.get('/busca', (req, res) => {
    const ola = puppeteer.launch().then(async function(browser) {
        const page = await browser.newPage();
        await page.goto('https://www.fflogs.com/reports/qP7hr1nFy3dx2ZQw#fight=3&type=damage-done');
    
        // const parsenumero = '#main-table-0 tbody tr td:nth-child(1)  a';
        // const parsenomers = '#main-table-0 tbody tr td:nth-child(2)  a';

        const parseNome = await page.$$eval('#main-table-0 tbody tr td:nth-child(2)  a', function(parses) {
            // Mapeia todos os nome 
                return parses.map(function(parse) {
              return parse.innerText;
            });
        });

        const parseNumber = await page.$$eval('#main-table-0 tbody tr td:nth-child(1)  a', function(parses) {
            // Mapei todos os parses
                return parses.map(function(parse) {
              return parse.innerText;
            });
        });


        // const resposta = await Promise.all([parseNome, parseNumber]).then(data => {
        //     const dataNome = data[0];
        //     const dataParse = data[1];
        //     const novaData = {};

        //     dataParse.forEach(function (k, i) {
        //         novaData[k] = dataNome[i]
        //     })
            
        //     // console.log(novaData)
        // });

        //Para poder criar um JSON com 2 arrays, eu precisei criar uma condição
        //como não consegui chegar da forma que eu queria, então criei esse return abaixo
        const resposta = await Promise.all(parseNumber.map(async function (k, i) {
            const dataNome = parseNome;
            return '"' + k + '"' + ": " + '"' + dataNome[i] + '"';
             
        }));
        
        const stringando = '{';

        //retorna uma resposta da chamada GET contendo a string do parse com nome do player
        res.send(stringando.concat(resposta.toString(), '}'));
        await browser.close();
    });


});

