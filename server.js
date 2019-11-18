const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose')

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const authentication = require('./middleware/authentication')


const app = express();


app.use(bodyParser.json()) // parse incoming request


// CORS


// authentication middleware
app.use(authentication);

// middleware to handle graphQL requests on the path /graphql this path can change anytime
app.use('/graphql', graphQLHttp({
    schema: graphQLSchema,
    // takes all resolvers method define in RootQuery and RootMutation
    rootValue: graphQLResolvers,
    graphiql: true
}))


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0-af1hq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {
    useNewUrlParser:  true
})
.then(() => {
    console.log("Connected to Database")
    app.listen(9000)
}).catch( err => {
    console.log(err)
})