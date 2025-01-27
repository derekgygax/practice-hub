import jwt from 'jsonwebtoken';

// Can do it this way!!
// export default (req, res, next) => {
//   // middleware logic here
// };

// Look at how next() is being used here
// It move the request along

// Requests must hit this middleware here and get processed
// before they are sent on to where they actuall go

// You can play with the header in here!!
const isAuthMiddleware = (req, res, next) => {
  // Headers
  // See if there is an authorization field in the incomming request header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    // This is a field that will be in the request
    req.isAuth = false;
    // Putting next() here means the request continues with the 
    // new metadata field isAuth added!!
    // HOLY SHIT THIS IS HOW THIS WORKS
    // This LEAVES the function!!
    // so now the request just has the one thing added to the middleware
    return next();
  }
  // Authorization: Bearer fasdaksldf.. Bearer is a convention.
  // Authorization will be
  //    Bearer adsfasdfas 
  // second value is the token!
  // If no token send back again
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  // verify token
  // first argument is token, second is the key you used in auth.js
  // Remember that key should be something better!!
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  // check token is actually set
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  // NOW TOKEN IS VALID and you are authenticated :)
  req.isAuth = true
  // get user id from decoded token
  // pull info stored in token in auth
  req.userId = decodedToken.userId;
  next();
}

export default isAuthMiddleware;