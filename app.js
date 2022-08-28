const express = require('express')
const app = express()
const port = 3000
const db = require('./db_connection')

const serverless = require('serverless-http');

const cors = require("cors")
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Respond with Hello World! on the homepage:
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// get all records stored in data.json
app.get('/workoutLogs', (req, res) => {
    db.getRecords(req, res)
    
})


// Respond to POST request on the root route (/record)
app.post('/workoutLog', (req, res) => {
    db.addRecord(req, res)
})

// Respond to a PUT request to the /user route:
app.put('/workoutLog', (req, res) => {
    db.updateRecord(req, res)
})
// Respond to a DELETE request to the /record route:
// example http://localhost:3000/record?id=1

app.delete('/workoutLog', (req, res) => {
    db.deleteRecord(req,res)
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function generateID() {
    const ids = data.map((record) => {
        return record.id;
    });
    if (ids.length === 0) {
        return 0;
    }
    return Math.max(...ids) + 1;
}

app.get("/workoutVolumePerExercise", (req, res) => {
    let volume = 0
    const exercise = req.query.exercise
    data.forEach((log)=> {
        if(log.exercise === exercise) {
            
            volume += parseInt(log.reps) * parseInt(log.sets) * parseInt(log.weight)
           
        }
    })
    res.send({"volume":volume})


})  

app.delete('/workoutLog', (req, res) => {
    db.deleteRecord(req,res)
})

module.exports.handler = serverless(app);
