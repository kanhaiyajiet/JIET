const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;

const PORT = 7000;

app.listen(PORT, () => {
    console.log(`my server is running on port: ${PORT}`);
});