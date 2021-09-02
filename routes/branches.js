const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mysql = require('../api/mysql');


router.get('/', async (req, res) => {

  try {
    const modelData = {
      operation: 'GET',
      model: {
        isMultiple: true,
        name: 'Branches'
      }
    };

    const result = await mysql({
      method: 'POST',
      data: modelData
    })

    res.status(200).json(result.data);
  } catch (err) {
    if (err.isAxiosError) {
      const { response: { status, data } } = err;
      res.status(status).send(`${data}`)
    }
    else {
      res.status(400).send(`Something failed: ${err.message}`);
    }
  }
});


module.exports = router;