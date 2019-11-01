const express = require("express");
const router = express.Router();
const Actions = require("./actionModel");
const Projects = require("./projectModel");

const restricted = (req, res, next) => {
    const { pid } = req.body;

    Projects.get(pid)
    .then(response => {
        console.log("check middle", response);
        response !== null ? next() : res.status(404).json({message: "project specified ID does not exist"})
    })
    .catch(error => console.log(error))
}

router.post("/", restricted, (req, res) => {
    const { descript, info, pid } = req.body;
    console.log("howdy");
    Actions.insert({descript, info, pid})
    .then(response => {
        res.status(200).json({message: "action success"});
})
.catch(error => {
    res.status(500).json({message: "server error"});
    })
})

router.get("/:id", (req, res) => {
    const id = req.params;

    Actions.get(id)
    .then(response => {
        console.log(response);
        response !== undefined ? res.status(200).json({message: "success", data: response}) : null;
    })
    .catch(error => {
        res.status(500).json({message: "server error"});
    })
})

router.put("/", (req, res) => {
    const {id, pid, descript, info } = req.body;
    console.log(id, {pid, descript, info})
    Actions.update(id, {pid, descript, info})
    .then(response => {
        console.log(response);
        response !== null ? res.status(200).json({message: "updated"}) : res.status(404).json({message: "project specified ID does not exist"})
    })
    .catch(error => {
        res.status(500).json({message: "server error"})
    });
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Actions.remove(id)
    .then(response => {
        console.log(response);
        res.status(200).json({message: "id reomved"})
    })
    .catch(error => res.status(500).json({message: "server error"}));
})

module.exports = router;