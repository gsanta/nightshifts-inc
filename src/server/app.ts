import express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi');
});

export default app;
