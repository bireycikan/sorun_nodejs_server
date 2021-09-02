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

router.get('/:id', async (req, res) => {

  try {
    const { id } = req.params;

    const modelData = {
      operation: 'GET',
      model: {
        name: 'Branches',
        fields: {
          branch_id: id
        }
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
})

router.post('/:id', async (req, res) => {

  try {
    const { id } = req.params;

    if (_.isEmpty(req.body)) {
      return res.status(400).json({
        success: false,
        message: "You must send fields object with field names and updated values in order to update!",
        detail: "e.g: fields: { 'phone': '+902121234567' } - [name,phone,full_address,latitude,longitude] fields can be updated."
      });
    }

    const { fields } = req.body;

    const modelData = {
      operation: 'UPDATE',
      model: {
        isMultiple: false,
        name: 'Branches',
        id: {
          name: "branch_id",
          value: id
        },
        fields: fields
      }
    };


    await mysql({
      method: 'POST',
      data: modelData
    })

    res.status(200).json({ success: true, message: "Successfuly updated!" })
  } catch (err) {
    if (err.isAxiosError) {
      const { response: { status, data } } = err;
      res.status(status).send(`${data}`)
    }
    else {
      res.status(400).send(`Something failed: ${err.message}`);
    }
  }
})


module.exports = router;