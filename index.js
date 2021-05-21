const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', require('./src/controllers/UsersController'));

app.listen(port, () => console.log(`ouvindo porta ${port}!`));
