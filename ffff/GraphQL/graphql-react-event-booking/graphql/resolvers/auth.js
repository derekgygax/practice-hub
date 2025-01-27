
import { User } from "../../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const usersResolvers = {
  // THIS IS TEH createEvent resolver!!
  // TODO 
  // This is a HUGE security flaw!!!!
  // This puts the passwords as plain text and that is AWFUL!!
  // You need to fix this!!
  // Do it like this!
  // You need a hashed password that can't be decrypted
  // USE THE PACKAGE
  //  bcryptjs to do to cryptographic stuff
  // Then the cryptographic made passwords can be compared to each other
  // for login but NEVER saved as a string!!
  // createUser: async (args) => {
  //   const user = new User({
  //     email: args.userInput.email,
  //     password: args.userInput.password
  //   });
  // }
  // YOU MUST DO THE FOLLOWING!!!
  createUser: async (args) => {

    try {
      // Make sure the same user can't be created!!
      // The {} is filter
      // This will always return something, user can be undefined
      // If there is no user already created!!
      // console.log('createUser check if old BEFORE DB');
      const oldUser = await User.findOne({ email: args.userInput.email })
      // console.log('createUser check if old ADTER DB');
      if (oldUser) {
        throw new Error("User exists already.");
      }

      // hash the password!!
      // Second argument is the amount of salting.
      // 12 rounds of salting was considered safe in 2018. NOW idk
      // It is asynchronous!!
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      // create user with hashed password
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      // Save to the DB and return
      // console.log('createUser CREATING if old BEFORE DB');
      const result = await newUser.save();
      // console.log('createUser CREATING if old AFTER DB');
      // REMEMBER YOU DON"T EVER WANT TO RETURN THE PASSWORD!!!
      // THAT IS ALSO A SECURITY FLAW AND YOU WOULD NEVER NEED IT!!!
      return {
        ...result._doc,
        password: null
      };

    } catch (err) {
      throw err;
    }
  },
  // FOR USER AUTHENTICATION
  // ENSURE USER IS CORRECT AND PASS BACK TOKEN!!
  login: async ({ email, password }) => {

    // console.log('login findOne BEFORE DB');
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist.");
    }
    // console.log('login findOne AFTER DB');


    // remember the password was slated
    // console.log('login checkpassword BEFORE');
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    // console.log('login checkpassword AFTER');

    // build token
    // this is synchronous
    // console.log('login createTokent BEFORE');
    const token = jwt.sign(
      // data in token
      { userId: user.id, email: user.email },
      // string to hash token
      // required for validating
      // privat key, who knows could validate, ONLY on server
      // USE LONGER STRING!!! SOMETHING GOOD!!
      'somesupersecretkey',
      // extra stuff like when expiring
      {
        expiresIn: '1hr'
      }
    );
    // console.log('login createToken AFTER');

    return {
      userId: user.id,
      token: token,
      // this 1 means 1 hour
      tokenExpiration: 1
    };
  }
}