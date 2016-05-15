const express = require('express')

const app = express();

app.use(express.static('static'));

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log("Started server at port", port);
});