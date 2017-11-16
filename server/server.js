const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 1337;


app.use(bodyParser.json());
app.use(cors());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://neon-app.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://neonbeta.com/',
    issuer: "https://neon-app.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

// ROUTES
// app.use('/user', user);

app.get('/', (request, response) => {
  response.send('Hello Neon!');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
