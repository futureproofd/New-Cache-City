/* eslint-disable react/jsx-filename-extension */
import Home from '../components/Home';
import AddCache from '../components/AddCache';
import App from '../components/App';
import Login from '../components/Login';
import Register from '../components/Register';
import Caches from '../components/Caches';
import Cache from '../components/Cache';
// our spread objects contain the component and any loadData function
export default [
  {
    ...App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: '/addcache',
        component: AddCache,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/caches',
        component: Caches,
      },
      {
        path: '/cache',
        component: Cache,
      },
    ],
  },
];
