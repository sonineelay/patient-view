// Entry point to start the server
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on Localhost at ${PORT} PORT`);
});
