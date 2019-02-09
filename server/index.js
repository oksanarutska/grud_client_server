const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
app.use(express.json());
app.use(cors());

const adapter = new FileSync('data.json');
const db = low(adapter);

app.put('/users/:id', function (req, res) {
    const user = req.body;
    user.id = +req.params.id;
    const updatedUser = db.get('users')
        .find(x => x.id == user.id)
        .assign(user)
        .write();
    res.send(updatedUser);
});

app.get('/users', function (req, res) {
    let allUsers = db.get('users').value();
    let {limit, page, search} = req.query;
    limit = Number(limit || 10);
    page = Number(page || 0);
    search = search || '';

    let filteredUsers = allUsers.filter(x => x.name.toLowerCase().indexOf(search) >= 0);

    res.send({
        users: filteredUsers.slice(page * limit, (page + 1) * limit),
        total_count: filteredUsers.length
    });
});

app.delete('/users/:id', function (req, res) {
    const userId = req.params.id;

    db.get('users')
        .remove(u => u.id === +userId)
        .write();

    res.status(200);
    res.send('');
});

app.post('/users', function (req, res) {
    const user = req.body;
    const maxId = db.get('users').value().reduce((max, curr) => {
        if (max < curr.id) {
            return +curr.id;
        }
        return +max;
    }, 0);

    user.id = maxId + 1;

    if (user.name && user.name.length > 0) {
        console.log(user);
        db.get('users')
            .push(user)
            .write();

        res.status(200);
        res.send(user);
    }
    else {
        res.status(400);
        res.send('Please with name');
    }

});

app.listen(7070, function () {
    console.log('Example app listening on port 8080!');
});