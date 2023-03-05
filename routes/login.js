const express = require('express');
const router = express.Router()
const userDB = require('../public/database/mongoDB')
const memoryDB = require('../public/database/memory')

router.get("/", (req, res) => {
    res.render('Login', { message: '' })
})

router.get("/register", (req, res) => {
    res.render('Register')
})

router.get("/home", (req, res) => {
    if (req.session.login) {
        const writer = req.session.username
        memoryDB.find({ writer: writer }).then((data) => {
            console.log(data);
            res.render('index', { username: req.session.username, momories: data })
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.render('Login', { message: '' })
    }
})
router.get("/share_memory", (req, res) => {
    if (req.session.login) {
        memoryDB.find({ status: "YES" }).then((data) => {
            res.render('share_memory', { username: req.session.username, momories: data })
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.render('Login', { message: '' })
    }
})

router.get("/add_memory", (req, res) => {
    if (req.session.login) {
        res.render('add_memory', { username: req.session.username })
    } else {
        res.render('Login', { message: '' })
    }
})

router.get("/manager", (req, res) => {
    if (req.session.login) {
        const writer = req.session.username
        memoryDB.find({ writer: writer }).then((data) => {
            console.log(data);
            res.render('manager_memory', { username: req.session.username, momories: data })
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.render('Login', { message: '' })
    }
})

router.get('/:id', (req, res) => {
    if (req.session.login) {
        const memory_id = req.params.id
        memoryDB.findOne({ _id: memory_id }).then((data) => {
            res.render('memories', { username: req.session.username,memories: data })
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.render('Login', { message: '' })
    }
})


module.exports = router