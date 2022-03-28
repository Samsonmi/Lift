const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 9000

let lifts = [{
    "id": "0",
    "floor": "0",
    "passengers": "0",
    "direction": "0",
},
{
    "id": "1",
    "floor": "0",
    "passengers": "0",
    "direction": "0",
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/lift', (req, res) => {
    console.log("GET lifts");
    res.json(lifts);
});

app.get('/lift/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // searching lifts for the id
    for (let lift of lifts) {
        if (lift.id === id) {
            res.json(lift);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('lift not found');
});

app.post('/lift/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;
    const newlift = req.body;

    // remove item from the lifts array
    for (let i = 0; i < lifts.length; i++) {
        let lift = lifts[i]

        if (lift.id === id) {
            lifts[i] = newlift;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('lift is edited');
});

app.post('/lift', (req, res) => {
    const lift = req.body;

    // output the lift to the console for debugging
    console.log(lift);
    lifts.push(lift);

    res.send('lift is added to the database');
});

app.delete('/lift/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // remove item from the lifts array
    lifts = lifts.filter(i => {
        if (i.id !== id) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('lift is deleted');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));