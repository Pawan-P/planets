const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const planets = [
    { id:1, name: 'Mercury'},
    { id:2, name: 'Venus'},
    { id:3, name: 'Earth'},
    { id:4, name: 'Mars'},
    { id:5, name: 'Jupiter'},
    { id:6, name: 'Saturn'},
    { id:7, name: 'Uranus'},
    { id:8, name: 'Neptune'}
];

app.get('/', (req, res) => {
    res.send(planets);
});

app.get('/:id', (req, res) => {
    const planet = planets.find(c => c.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send('The planet with the given ID was not found.');
  
    res.send(planet);
});

app.post('/',(req, res) => {
    let name = req.body.name;    
    const schema = Joi.object({
        name : Joi.string().min(3).max(10).required()
    })
    const result = schema.validate(req.body)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{
        let planet = {
            id : planets.length + 1,
            name : name
        }
        planets.push(planet);
        res.send(planet);
    }    
});

app.put('/:id', (req, res) => {
    const planet = planets.find(c => c.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send(`Could not find the ID ${req.params.id}`);
    const schema = Joi.object({
        name : Joi.string().min(3).max(10).required()
    })
    const result = schema.validate(req.body)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else{  
        planet.name = req.body.name;
        res.send(planet);
    }
});

app.delete('/:id', (req, res) => {
    const planet = planets.find(c => c.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send(`Could not find the ID ${req.params.id}`);
  
    console.log(planets.indexOf(planet))
    const index = planets.indexOf(planet.name);
    planets.splice(index, 1);
  
    res.send(planet);
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}......`));

