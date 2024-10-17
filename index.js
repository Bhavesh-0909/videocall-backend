const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateToken04 } = require('./token');

const app = express();
const port = 3000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/token', (req, res) => {
    const appId = parseInt(req.body.appId);
    const userId = req.body.userId;
    const secret = req.body.serverSecret;
    const effectiveTimeInSeconds = parseInt(req.body.effectiveTimeInSeconds);
    console.log('appId: ', appId);
    console.log('userId: ', userId);
    console.log('secret: ', secret);
    console.log('effectiveTimeInSeconds: ', effectiveTimeInSeconds);
    try {
        const token = generateToken04(appId, userId, secret, effectiveTimeInSeconds);
        res.send(token);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});