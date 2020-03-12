const express = require('express');
const os = require('os');

const app = express();
let balance = 10;
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/wallet', (req, res) => res.send({ balance }));
app.post('/api/wallet', function(req, res, next) {
    switch (req.body.action) {
        case 'deposit':
            balance += req.body.amount;
            break;
        case 'withdraw':
            balance -= req.body.amount;
            break;
    }
    res.send(balance);
  });


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
