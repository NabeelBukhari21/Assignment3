const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
require('pg');
const Sequelize = require('sequelize');


legoData.initialize()
    .then(() => {
        console.log('Lego data initialized successfully');
    })
    .catch(err => {
        console.error('Error initializing lego data:', err);
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(sets => {
                res.json(sets);
            })
            .catch(err => {
                res.status(404).send(err);
            });
    } else {
        legoData.getAllSets()
            .then(sets => {
                res.json(sets);
            })
            .catch(err => {
                res.status(404).send(err);
            });
    }
});

app.get('/lego/sets/:setNum', (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then(set => {
            res.json(set);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
