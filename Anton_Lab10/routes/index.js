const userRoutes = require('./users');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/signup', userRoutes);
  app.use('/login', userRoutes)
  app.use('/private', userRoutes);
  app.use('/logout', userRoutes)

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;