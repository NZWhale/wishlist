const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = "./data"


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json())


// This are handlers for login and registation form
app.get('/login', (req, res) => {
    if (fs.existsSync(path)) {
        fs.readFile('data/users.json', (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data)
        });
    } else {
        fs.mkdirSync("data")
        fs.writeFileSync('data/users.json', "[]")
        fs.readFile('data/users.json', (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data)
        });
    }
})

app.post('/login', (req, res) => {
    const user = req.body;
    if (fs.existsSync(path)) {
        const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))
        const userFound = users.find(singleUser => singleUser.login === user.login && singleUser.password === user.password)
        if (userFound) {
            console.log("login successful")
            res.status(200).send("login successful")
        } else {
            console.log("user not found")
            res.status(404).send("user not found")
        }
    }
})

app.post('/registration', (req, res) => {
    const user = req.body
    if (fs.existsSync(path)) {
        const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))
        const userFound = users.find(singleUser => singleUser.login === user.login && singleUser.password === user.password)
        if (userFound) {
            console.log("user already exist")
            res.status(404).send("user already exist")
        } else {
            users.push(user)
            fs.writeFile('data/users.json', JSON.stringify(users), (err) => {
                if (err) throw err
                console.log("user successfully created")
                res.status(200).send("user successfully created")
            })
        }
    } else {
        fs.mkdirSync("data")
        fs.writeFile('data/users.json', user, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
    }
})

// ------------------------------------------------

// This are handlers for getting and sending wishes to DB
app.get('/wishes', (req, res) => {
    if (fs.existsSync(path)) {
        fs.readFile('data/wishes.json', (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data)
        });
    } else {
        if (!fs.existsSync("./data")) {
            fs.mkdirSync("data")
            fs.writeFileSync('data/wishes.json', "[]")
        }
        fs.readFile('data/wishes.json', (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data)
        });
    }
})

app.post('/wishes', (req, res) => {
    const arrayOfWishes = req.body;
    if (fs.existsSync(path)) {
        fs.writeFile('data/wishes.json', JSON.stringify(arrayOfWishes), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } else {
        fs.mkdirSync("data")
        fs.writeFile('data/wishes.json', JSON.stringify(arrayOfWishes), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
    }
})
// ------------------------------------------------



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})