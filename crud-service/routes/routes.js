const calcs = require('../controllers/controller.js');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (app) => {
  // Configure JWT strategy for authentication
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret_key', // Replace with your secret key
  };

  // Initialize and use JWT strategy for passport
  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      if (jwtPayload) {
        return done(null, jwtPayload);
      } else {
        return done(null, false);
      }
    })
  );

  // Calculator endpoints with JWT authentication
  app.get('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.performOperation(req, res, (num1, num2) => parseFloat(num1) + parseFloat(num2));  });  

  app.get('/subtract', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.performOperation(req, res, (num1, num2) => parseFloat(num1) - parseFloat(num2));  });

  app.get('/multiply', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.performOperation(req, res, (num1, num2) => parseFloat(num1) * parseFloat(num2));  });

  app.get('/divide', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.performOperation(req, res, (num1, num2) => parseFloat(num1) / parseFloat(num2));  });

  app.get('/read', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.getRandomCalculation(req, res);});

    app.put('/update/:calcId', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.updateCurrentCalculation(req, res); });
    

  app.delete('/delete/:calcId', passport.authenticate('jwt', { session: false }), (req, res) => {
    calcs.deleteCurrentCalculation(req, res);  });
  
};
