const express = require("express");
const router = express.Router();
const Projects = require("./projectModel");

router.post("/", (req, res) => {
    const { name, descript } = req.body;

    Projects.insert({name, descript})
    .then(response => {
        res.status(200).json({message: "created"});
    })
    .catch(error => {
        res.status(500).json({message: "server error"});
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params;

    Projects.get(id)
    .then(response => {
        res.status(200).json({message: "retrieved", data: response});
    })
    .catch(error => {
        res.status(500).json({message: "server error"});
    })
})

router.get("/", (req, res) => {

    Projects.get()
    .then(response => {
        res.status(200).json({message: "retrieved", data: response});
    })
    .catch(error => {
        res.status(500).json({message: "server error"});
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, descript } = req.body;

    Projects.update(id, {name, descript})
    .then(response => res.status(200).json({message: "updated", data: response}))
    .catch(error => res.status(500).json({message: "server error"}));
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Projects.remove(id)
    .then(response => res.status(200).json({message: "removed successfully"}))
    .catch(error => res.status(500).json({message: "server error"}));
})

router.get("/getActions/:project_id", (req, res) => {
    const { project_id } = req.params;

    Projects.getProjectActions(project_id)
    .then(response => res.status(200).json({message: "list retrieved", data: response}))
    .catch(error => res.status(500).json({message: "server error"}))
})

module.exports = router;