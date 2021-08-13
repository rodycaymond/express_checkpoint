const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);

app.use(bodyParser.urlencoded({extended: true}));

app.get('/movies', function(req, res) {
    if(req.query.title){
        knex
            .select('*')
            .from('express_movies')
            .where('title', req.query.title)
            .then(data => res.status(200).json(data))
            .catch(err =>
            res.status(404).json({
                message:
                'The data you are looking for could not be found. Please try again'
            })
        );
    } else {
        knex
            .select('*')
            .from('express_movies')
            .then(data => res.status(200).json(data))
            .catch(err =>
            res.status(404).json({
                message:
                'The data you are looking for could not be found. Please try again'
            })
        );
    }
});

app.get('/movies/:id', function(req,res){
    knex
        .select('*')
        .from('express_movies')
        .where('id', req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(err=> res.status(404).json({
            message: 'The data you are looking for could not be found. Please try again'
        })
    );
})

app.post('/movies', function(req,res){
    console.log(req.body)
    knex('express_movies')
    .insert(
        {title: req.body.title,
        genre: req.body.genre,
        release_date: req.body.release_date}
    )
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(404).json({
        message: 'invalid input'
        })
    );
})
app.delete('/movies/:movieId', function(req,res){
    knex('express_movies')
    .where('id', req.params.movieId)
    .del()
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(404).json({
        message: 'there is no movie of that kind'
    })
    );
})
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});