const readlineSync = require('readline-sync');
const symbol = readlineSync.question('Qual o par de moedas vamos monitorar?');

const WebSocket = require('ws');

const ws = new WebSocket('wss://stream.binance.com:9443/ws/bookTicker');

ws.onopen = () => {
    ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": [
            `${symbol}@bookTicker`
        ],
        "id": 1
    }))
}

ws.onmessage = (event) => {
    // Limpar console antes da resposta
    process.stdout.write('\033c');
    const obj = JSON.parse(event.data);
    // mostrando symbol = s
    console.log(`Symbol: ${obj.s}`);
    // lower ask = a
    console.log(`Best Ask: ${obj.a}`);
    // lower bid = b
    console.log(`Best Bid: ${obj.b}`);
    
}


