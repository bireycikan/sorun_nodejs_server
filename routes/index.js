const _ = require('lodash');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mysql = require('../api/mysql');


router.post('/authenticate', async (req, res) => {

  try {
    if (_.isEmpty(req.body)) {
      return res.status(400).json({
        success: false,
        message: "You must send user\'s email and password",
        detail: "e.g: { email: 'email', password: 'password' }"
      });
    }

    const { email, password } = req.body;

    const query = `SELECT * FROM Users LEFT JOIN Roles ON Users.role_id=Roles.role_id WHERE email='${email}' AND password='${password}';`

    const result = await mysql({
      method: 'POST',
      data: {
        operation: "QUERY",
        model: {
          query
        }
      }
    })

    const token = jwt.sign(result.data[0], 'secret_key');

    res
      .status(200)
      .header('x-auth-token', token)
      .json({ success: true })
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