const express = require('express');
const router = express.Router();
const data = require('../data');
const userApi = data.userApi;


router.get('/people/:id', async (req, res) => {
    try {
      const person = await userApi.getPersonById(parseInt(req.params.id));
      res.json(person);
    } catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
});

router.get('/work/:id', async (req, res) => {
    try {
      const job = await userApi.getWorkById(parseInt(req.params.id));
      res.json(job);
    } catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
});

router.get('/people', async (req, res) => {
    try {
      const people = await userApi.getPeople();
      res.json(people);
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send();
    }
});
  

router.get('/work', async (req, res) => {
    try {
      const work = await userApi.getWork();
      res.json(work);
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send();
    }
});
  

module.exports = router;