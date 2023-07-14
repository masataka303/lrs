const line = require("@line/bot-sdk");
const express = require("express");
var app = express();

const CONFIG = {
	channelAccessToken: '7H5WKQpXwBXYjojWlSwVQ5W2ktWZQRfcrm9ycSaVwAsQ+vMiwHndpLH8dYxk/8Nc1C1tXdE77FvYvH9U1w6JSa60e1rxZDaLL2O3GupQwWLIgR5QMG8D8uJ9kc85qJZzR0v5aytKUmeDgsNZz9vB/gdB04t89/1O/w1cDnyilFU=',
	channelSecret: 'e1eee9918f6396d8af3d4b00b26db24e'
};

const PORT = 3000;
const client = new line.Client(CONFIG);

app.post("/callback", line.middleware(CONFIG), (req, res) => handleBot(req, res))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

function handleBot(req, res) {
    res.status(200).end();
    req.body.events.map((event) => {
        if(event.type = "message"){
            let text_message = event.message.text;
            switch (text_message) {
                case 'お弁当を予約':
                    client.replyMessage(event.replyToken, { type: 'text', text: 'ニックネームを登録します。' });
                    break;
                case '注文状況を確認':
                    orderStatus(event);
                    break;
                default:
                    client.replyMessage(event.replyToken, { type: 'text', text: 'ごめんなさい。意味が分かりません。' });
            }
        }
        console.log(event)
        
    })
}
function orderStatus(event) {
    const message = {
      type: 'text',
      text: '[注文状況]\n野村:おすすめ弁当(600円)\n石井:満腹弁当(650円)\n申:満足弁当(700円)'
    };
    client.replyMessage(event.replyToken, message);
}