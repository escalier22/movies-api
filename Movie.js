const mongoose = require('mongoose');

const URL_MONGO = "mongodb+srv://escalier:esc00303000@0-9up8c.mongodb.net/test";

mongoose.connect(
    URL_MONGO,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    },
    (error) => {
        if(error) console.log(error);
        if(!error) console.log('Conexion exitosa')
    }
);

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        default: 90
    },
    isActive:{
        type: Boolean,
        default: true
    },
    directors: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Director'
        }]
    },
}, {timestamps: true});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Movie };