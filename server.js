const express = require('express');
const bodyParser = require('body-parser');

const { Movie } = require('./Movie');
const { Director } = require(`./Director`);
const PORT = 3001;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/status', (req, res) =>{
    res.status(200).send({message: 'Server OK'});
});

// ------- MOVIE ------ //
app.post('/movie', (req, res) =>{
    const movie = req.body;
    Movie.create(movie, (err, newMovie) =>{
        err
        ? res.status(409).send(err)
        : res.status(201).send(newMovie);
    });
});

app.get('/movies', (req,res) => {
    Movie.find().populate('directors').exec()
        .then( (movies) => res.status(200).send(movies))
        .catch( (error) => res.status(409).send(error))
});

app.get('/movie/:id', (req, res) =>{
    const { id } = req.params
    Movie.findById(id).populate('directors').exec()
    .then( (movie) => {
        movie
        ? res.status(200).send(movie)
        : res.status(404).send({message: "Movie not found"})
    })
    .catch( (error) => res.status(409).send(error))
});

app.get('/search', (req, res) => {
    const { title } = req.query;
    Movie.findOne({title}).exec()
    .then( (movie) => {
        movie
        ? res.tatus(200).send(movie)
        : res.status(404).send({message: "movie not found"})
    })
    .catch( (error) => res.status(409).send(error))
});

app.patch('/movie/:id', (req, res) => {
    const { id } = req.params
    const data = req.body
    Movie.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
    .then( (movie) => {
        movie
        ? res.status(200).send(movie)
        : res.status(404).send({message: "Movie not found"})
    })
    .catch( (error) => res.status(409).send(error))
});

app.delete('/movie/:id', (req, res) => {
    const { id } = req.params
    const data = req.body
    Movie.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true}).exec()
    .then( (movie) => {
        movie
        ? res.status(200).send(movie)
        : res.status(404).send({message: "Movie not found"})
    })
    .catch( (error) => res.status(409).send(error))
});



app.post('/director', (req, res) =>{
    const director = req.body;
    Director.create(director, (err, newDirector) =>{
        err
        ? res.status(409).send(err)
        : res.status(201).send(newDirector);
    });
});

app.patch('/director/:id', (req, res) => {
    const { id } = req.params
    const data = req.body
    Director.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
    .then( (director) => {
        director
        ? res.status(200).send(director)
        : res.status(404).send({message: "Director not found"})
    })
    .catch( (error) => res.status(409).send(error))
});

app.get('/director/:id', (req, res) =>{
    const { id } = req.params
    Director.findById(id)
    .then( (director) => {
        director
        ? res.status(200).send(director)
        : res.status(404).send({message: "Director not found"})
    })
    .catch( (error) => res.status(409).send(error))
});

app.get('/directors', (req,res) => {
    Director.find()
        .then( (directors) => res.status(200).send(directors))
        .catch( (error) => res.status(409).send(error))
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});