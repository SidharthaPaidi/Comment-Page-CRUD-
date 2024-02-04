const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {   
        id:uuid(), 
        username: 'Todd',
        comment: 'lol that is funny'
    },
    {   
        id:uuid(),
        username: 'Skyler',
        comment: 'i like to go birdwatching with my dog'
    },
    {   
        id:uuid(),
        username: 'SkBerBoi',
        comment: 'Plz delete your account , Todd'
    },
    {   
        id:uuid(),
        username: 'onlysaywoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment ,id : uuid()})
    res.redirect('/comments') //redirects to comments
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show',{ comment })
})

app.get('/comments/:id/edit',(req, res) =>{
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit',{ comment })

})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

app.delete('/comments/:id',(req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})


app.get('/tacos', (req, res) => {
    console.log("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body
    res.send(`Ok here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("On port 3000")
})