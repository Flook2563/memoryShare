const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const userDB = require('../public/database/mongoDB')
const memoryDB = require('../public/database/memory')


router.get("/", (req, res) => {
    res.render('Login')
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await userDB.findOne({
        username
    });
    if (user) {
        const isCorrect = bcrypt.compareSync(password, user.password);
        if (isCorrect) {
            const sessionMaxage = 3600000;
            req.session.login = true

            req.session.username = user.username
            req.session.cookie.maxAge = sessionMaxage

            res.redirect('/home')
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }

})

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new userDB({
        username,
        password: passwordHash,
        email
    });
    await user.save()
    console.log(user);
    res.redirect('/')
})

router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

router.post("/save_memory", async (req, res) => {
    const { title, detail, status, writer } = req.body

    const momery = new memoryDB({
        title,
        detail,
        status,
        writer
    });
    await momery.save()
    console.log(momery);
    res.redirect('/home')
})

router.post("/edit_memory", async (req, res) => {
    const update_id = req.body.update_id
    const { title, detail, status, writer } = req.body

    const data = {
        title: req.body.title,
        detail: req.body.detail,
        status: req.body.status,
        writer: req.body.writer
    }
    memoryDB.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).then((data) => {
        console.log(data);
        res.redirect('/manager')
    }).catch((err) => {
        console.log(err);
    });
})

router.get('/delete/:id', (req, res) => {
    memoryDB.findByIdAndDelete(req.params.id, { useFindAndModify: false }).then((data) => {
        console.log(data);
        res.redirect('/manager')
    }).catch((err) => {
        console.log(err);
    });
})

router.post('/edit', (req, res) => {
    const edit_id = req.body.edit_id
    memoryDB.findOne({_id:edit_id}).then((data) => {
        console.log(data);
        res.render('edit_memory',{ username: req.session.username,memories:data})
    }).catch((err) => {
        console.log(err);
    });

})



router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})


module.exports = router