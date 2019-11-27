import express from 'express';
import { matchRoutes } from 'react-router-config';
import renderer from './renderer';
import createStore from './serverStore';
import Routes from '../routes/Routes';

const app = express();

// serve public dir to the public (essentially our client bundle.js)
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();
  console.log(matchRoutes(Routes, req.path));
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    // staticRouter context
    const context = {};
    const content = renderer(req, store, context);

    console.log('express path request: ', req.path);
    // redirect coming from client
    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }
    // send out to client
    res.send(content);
  });
});

app.listen(3001, () => {
  console.log('listening on 3001!');
});
