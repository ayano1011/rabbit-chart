const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
//チャネルのアクセストークン(La Vie Rabbitのアカウントに書き換え)
// const TOKEN = "rlWgREj4WwvTHV37sQEzUWv1KomK1mPnp7QtrpM7ZCZ+ck6ra73RdGyr+Cv+LWxeZ8CT9x3XAD+jx+GI9ml73d++x/GiIh6PIjF27ZFp/vs9JDAfR/Zkcc5uDxV3qpOhzwHbiURqkTdS7uEHJrNgTgdB04t89/1O/w1cDnyilFU=";
const TOKEN = "IhN8wjUeBwmJ0VsZ+Hhvru7cLk9pnS6WSYPzqHFQ1rT6uDGlH8atGiHO5lVEdE7+y1+M+xyDDOa2OJOBgLpOZh0Snp+/R0Ien1HGGXX1niXu6KdQAl5xRTIDuOdrTHk5gbbMW+5b7WmZV8XlGkfzTQdB04t89/1O/w1cDnyilFU=";


const cron = require('node-cron');
const request = require('request');

const axios = require('axios');
const csvtojson = require('csvtojson')


// const spreadsheetId = '1aYhwJAmP6dafQCxPcOV0iGFPmAEZwfpzVtvNvWsYgPo'; //追記
// const range = 'Sheet1!A1:B2'; //追記


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// スプレッドシートのデータを保持する変数
let sheetData;

//定期通知関数
function sendNotification() {

    // ③
    // sheetData = "";
    // console.log('test定期実行1');

    // // sheetData が未定義の場合、スプレッドシートのデータを取得して sheetData に代入する
    // if (!sheetData) {
    //     axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRFI98A5rPx4jcdCl4kqV3GVW5FDaIPjwoQACm3Wtnvbx0h3-QGUY7iB46_giXpAOd13gBm7Q1G92CJ/pub?output=csv')
    //         .then(function (response) {
    //             // 読み込んだデータをJSONに変換して sheetData に代入する
    //             csvtojson({
    //                 noheader: true,  // 1行目がヘッダーの場合はfalse
    //                 output: "csv"
    //             })
    //                 .fromString(response.data)
    //                 .then((csvRow) => {
    //                     sheetData = csvRow;
    //                 })
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     return;
    // }

    // console.log(sheetData[0][2]);
    // const options = {
    //     url: 'https://api.line.me/v2/bot/message/push',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + TOKEN,
    //     },
    //     json: {
    //         to: 'U702207f57cdec590f64165c6c227900d',
    //         messages: [
    //             {
    //                 type: 'text',
    //                 text: sheetData[0][2]
    //             }
    //         ]
    //     }
    // };

    // request(options, (error, response, body) => {
    //     console.log(response.body);
    //     if (error) {
    //         console.error(error);
    //     }
    // });



    // ②
    console.log('定期実行確認');
    //スプレッドシートのCSV用URLパス
    // axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRFI98A5rPx4jcdCl4kqV3GVW5FDaIPjwoQACm3Wtnvbx0h3-QGUY7iB46_giXpAOd13gBm7Q1G92CJ/pub?output=csv')
    axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vT22W8eHiSkSgSRpqRoEjnOaTxQouLnd2cgO2yIvnbi0oi-Ra2pOKlvHQwbPuPnnJVFSTyeElLAh6KO/pub?gid=201082093&single=true&output=csv')
        .then(function (response) {
            // 読み込んだデータをJSONに変換
            csvtojson({
                noheader: true,  // 1行目がヘッダーの場合はfalse
                output: "csv"
            })
                .fromString(response.data)
                .then((csvRow) => {
                    console.log(csvRow[0][3]);
                    const Valueofpoint = Number(csvRow[0][3]);
                    console.log(Valueofpoint + Valueofpoint);
                    if (Valueofpoint < 260) {
                        const options = {
                            url: 'https://api.line.me/v2/bot/message/push',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + TOKEN,
                            },
                            json: {
                                // チャネルのユーザーID（有田のIDへ書き換え）
                                // to: 'U702207f57cdec590f64165c6c227900d',
                                to: 'U8538748658af56484d37116fd769f105',
                                messages: [
                                    {
                                        type: 'text',
                                        text: `🐰昨日のうさちゃん🐰\n健康状態:注意⚠️\nうんちの量が少なくなっているようです\n(${csvRow[0][3]}ポイント)`
                                    }
                                ]

                            }
                        };
                    } else {
                        const options = {
                            url: 'https://api.line.me/v2/bot/message/push',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + TOKEN,
                            },
                            json: {
                                // チャネルのユーザーID（有田のIDへ書き換え）
                                // to: 'U702207f57cdec590f64165c6c227900d',
                                to: 'U8538748658af56484d37116fd769f105',
                                messages: [
                                    {
                                        type: 'text',
                                        text: `🐰昨日のうさちゃん🐰\n健康状態:良好✨\n(${csvRow[0][3]}ポイント)`
                                    }
                                ]

                            }
                        };
                    }
                    request(options, (error, response, body) => {
                        console.log(response.body);
                        if (error) {
                            console.error(error);
                        }
                    });
                })
        })
        .catch(function (error) {
            console.log(error);
        });


    // ①
    // axios でスプレッドシートのURLからCSV形式で取得
    // axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRFI98A5rPx4jcdCl4kqV3GVW5FDaIPjwoQACm3Wtnvbx0h3-QGUY7iB46_giXpAOd13gBm7Q1G92CJ/pub?output=csv')
    //     .then(function (response) {
    //         // 読み込んだデータをJSONに変換
    //         csvtojson({
    //             noheader: true,  // 1行目がヘッダーの場合はfalse
    //             output: "csv"
    //         })
    //             .fromString(response.data)
    //             .then((csvRow) => {
    //                 // console.log(csvRow[0]);
    //                 console.log(csvRow[0][2]);
    //             })
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .finally(function () {

    //     });




    // const options = {
    //     url: 'https://api.line.me/v2/bot/message/push',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + TOKEN,
    //     },
    //     json: {
    //         to: 'U702207f57cdec590f64165c6c227900d',
    //         messages: [
    //             {
    //                 type: 'text',
    //                 text: csvRow[0][2]
    //                 // text: '定期通知です。'
    //             }
    //         ]
    //     }
    // };
    // request(options, (error, response, body) => {
    //     console.log(response.body);
    //     if (error) {
    //         console.error(error);
    //     }
    // });
}

// 定期関数呼び出し
// cron.schedule('*/60 * * * * *', () => {
//     sendNotification();
// }, {
//     timezone: 'Asia/Tokyo'
// });
cron.schedule('0 0 9 * * *', () => {
    sendNotification();
}, {
    timezone: 'Asia/Tokyo'
});



// サンプルコード 通信確認用
// app.get("/", (req, res) => {
//     res.sendStatus(200)
// })

// app.post("/webhook", function (req, res) {
//     res.send("HTTP POST request sent to the webhook URL!")
//     // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
//     if (req.body.events[0].type === "message") {

//         const userMessage = req.body.events[0].message.text;

//         // ユーザーから送られたメッセージによって返信内容を生成
//         let replyMessages = [];
//         if (userMessage === "こんにちは") {
//             replyMessages.push({
//                 "type": "text",
//                 "text": "こんにちは！"
//             });
//         } else if (userMessage === "おはよう") {
//             replyMessages.push({
//                 "type": "text",
//                 "text": "おはようございます！"
//             });
//         } else {
//             replyMessages.push({
//                 "type": "text",
//                 "text": "よくわかりません。"
//             });
//         }

//         // 文字列化したメッセージデータ
//         const dataString = JSON.stringify({
//             replyToken: req.body.events[0].replyToken,
//             messages: replyMessages
//         })


//         // // 文字列化したメッセージデータ
//         // const dataString = JSON.stringify({
//         //     replyToken: req.body.events[0].replyToken,
//         //     messages: [
//         //         {
//         //             "type": "text",
//         //             "text": "Hello, user"
//         //         },
//         //         {
//         //             "type": "text",
//         //             "text": "May I help you?"
//         //         }
//         //     ]
//         // })

//         // リクエストヘッダー
//         const headers = {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + TOKEN
//         }

//         // リクエストに渡すオプション
//         const webhookOptions = {
//             "hostname": "api.line.me",
//             "path": "/v2/bot/message/reply",
//             "method": "POST",
//             "headers": headers,
//             "body": dataString
//             // "data": dataString
//         }

//         // リクエストの定義
//         const request = https.request(webhookOptions, (res) => {
//             res.on("data", (d) => {
//                 process.stdout.write(d)
//             })
//         })

//         // エラーをハンドル
//         request.on("error", (err) => {
//             console.error(err)
//         })

//         // データを送信
//         request.write(dataString)
//         request.end()
//     }
// })

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})