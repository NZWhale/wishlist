import {existsSync, readFile, mkdirSync, writeFileSync, readFileSync, writeFile} from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()
const port = 3000
const dataPath = "./data"
const usersFilePath = "./data/users.json"

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve() + '/'));
app.use(bodyParser.json())


// This are handlers for login and registation form

const generateAuthToken = () => {
    const tokenLength = 16
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < tokenLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

let authorisedUsers = {}

const findUserByLogin = (userLogin) => {
    const users = JSON.parse(readFileSync("data/users.json", "utf-8"))
    return users.find(({login}) => login === userLogin)
}

app.post('/login', (req, res) => {
    const user = req.body;
    if (!existsSync(dataPath)) {
        mkdirSync(dataPath)
    }
    if (!existsSync(usersFilePath)) {
        writeFileSync(usersFilePath, "[]")
    }
    const userFound = findUserByLogin(user.login)
    if (userFound && userFound.password === user.password) {
        const userData = {
            "userName": userFound.userName,
            "DoB": userFound.DoB
        }
        console.log("login successful")
        const cookieAge = 24 * 60 * 60 * 1000
        const authToken = generateAuthToken()
        authorisedUsers[authToken] = userFound.login
        res.cookie('auth-token', authToken, {maxAge: cookieAge, httpOnly: true})
        res.status(200).send(userData)
    } else {
        console.log("user not found")
        res.status(401).send("user not found")
    }
})

app.post('/check-login', (req, res) => {
    if (req.cookies) {
        const authToken = req.cookies["auth-token"]
        const userLogin = authorisedUsers[authToken]
        if (userLogin) {
            const user = findUserByLogin(userLogin)
            res.status(200).send({
                "userName": user.userName,
                "DoB": user.DoB
            })
            return
        }
    }
    res.status(401).send({})
})

app.post('/registration', (req, res) => {
    const user = req.body
    if (existsSync(dataPath)) {
        const users = JSON.parse(readFileSync("data/users.json", "utf-8"))
        const userFound = users.find(singleUser => singleUser.login === user.login && singleUser.password === user.password)
        if (userFound) {
            console.log("user already exist")
            res.status(404).send("user already exist")
        } else {
            users.push(user)
            writeFile('data/users.json', JSON.stringify(users), (err) => {
                if (err) throw err
                console.log("user successfully created")
                res.status(200).send("user successfully created")
            })
        }
    } else {
        mkdirSync("data")
        writeFile('data/users.json', user, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
    }
})

//---------------------------------------------------

// This are handlers for getting and sending wishes to DB
app.get('/wishes', (req, res) => {
    if (existsSync(dataPath)) {
        readFile('data/wishes.json', (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data)
        });
    } else {
        if (!existsSync("./data")) {
            mkdirSync("data")
            writeFileSync('data/wishes.json', "[]")
        }
        readFile('data/wishes.json', (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data)
        });
    }
})

app.post('/wishes', (req, res) => {
    const arrayOfWishes = req.body;
    if (existsSync(dataPath)) {
        writeFile('data/wishes.json', JSON.stringify(arrayOfWishes), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } else {
        mkdirSync("data")
        writeFile('data/wishes.json', JSON.stringify(arrayOfWishes), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
    }
})
// ------------------------------------------------


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})