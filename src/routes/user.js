const express = require('express');
const _ = require('lodash');

const router = express.Router();

const db = require('../../models/index');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { dataValues: user } = await db.users.findOne({ id });

  res.json(_.omit(user, 'password'));
});

router.post('/login', async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  const user = await db.users.findOne({
    where: { email, password },
    attributes: ['email'],
  });

  if (user) {
    res.json({ message: 'Success', user });
  } else {
    res.json({ message: 'Invalid username or password' }).statusCode(401);
  }
});

router.post('/signup', async (req, res) => {
  const { body } = req;

  const user = await db.users.create(body);

  res.json({
    message: 'Success',
    email: user.email,
    id: user.id,
  });
});

module.exports = router;
