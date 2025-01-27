If you want to launch this app far in the future
This is what you need to know.
- At this top level - will run on port 8000
  npm start
- There is a front end folder
  Get another command line in there - will run on port 3000
  npm start
- There is a LOCAL mongoDB database - currently community@7.0
  Run it as a macOS service
    brew services start mongodb-community@7.0
  Stop it with
    brew services stop mongodb-community@7.0
  To make sure it started
    brew services list
  To login on the command line
    mongosh admin -u derekgygax -p 'derekgygaxmongodb'
  This site for more information
    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

login mongo db on command line with username and password
  mongosh admin -u derekgygax -p 'derekgygaxmongodb'
  use events-react-dev
  show collections
  db.events.find()
  db.users.find()
  db.bookings.find()


# Learning GraphQL

> learning GraphQL with Max

## Prerequisites

- Node 20.10.0+
- npm 10.2.3+

## Install/Use Node 18

```
nvm install 20
nvm use 20
```

## Install Dependencies
### Need to do the extra install next-intl@3.0.0-beta.19 because it is still in beta
```
npm install
```

## Launch project. 

```
npm start
```
