const express = require('express');
const uuid = require('uuid-random')
const app = express();
app.use(express.json());

let tasks = [];

//obtain information from the server
app.get('/', (req,res) => {
    res.status(200).json(tasks);
});

//create a new registry on the server (a new task)
app.post('/', (req, res) => {
    const task = { ...req.body, taskId: uuid() };
    tasks.push(task);
    res.status(200).json(task);
});

app.get('/:taskId', (req, res) => {
    const id = req.params.taskId;
    const task = tasks.filter(task => task.taskId === id)[0];
    if(task){
        res.status(200).json(task);
    }else {
        res.sendStatus(404);
    }
});

//update a registry on the server
app.put('/:taskId', (req,res) => {
    const id = req.params.taskId;
    let changedTask;
    tasks.forEach((task, i) => {
        if(task.taskId === id){
            changedTask = {
                ...task,
                ...req.body
            };
            tasks[i] = changedTask;
        }
    });
    res.status(200).json(changedTask);
});

app.delete('/:taskId', (req,res) => {
    const id = req.params.taskId;
    tasks = tasks.filter(task => task.taskId !== id);
    res.sendStatus(200);
});

app.listen(3001, () => console.log('Running on Port 3001'));