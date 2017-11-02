import 'babel-polyfill';
import app from './app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.get('/', (req, res) => {
  res.end();
});
