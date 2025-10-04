
import express from 'express';
import router from './routes/routes';


const cookies = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.set('view engine', 'ejs');
app.use(router);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});