const express = require("express");
const router = express.Router();
const BasicProgrammOfMUISJSON = require('../data/BasicProgrammOfMUIS.json');
const BasicProgrammOfUFEJSON = require("../data/BasicProgrammOfUFE.json");

router.route('/').get((req, res) => {
    res.status(200).json({
      data: [
        BasicProgrammOfUFEJSON,
        BasicProgrammOfMUISJSON
      ],
    });
})
module.exports = router;
