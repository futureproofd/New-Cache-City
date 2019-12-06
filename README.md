# New Cache City

> Fullstack Application written in React (Frontend) NodeJS (Backend) MongoDB (Datastore)


## Installation

- Consists of two packages contained in backend/frontend folders
- Install each via package.json
- Mock data is not present at the moment, so API keys are required for backend implementation!

>backend

```shell
$(backend) npm install
$(backend) npm run dev
```

>frontend

```shell
$(frontend) npm install
$(frontend) npm run dev
```

- These will run concurrently in the future (see SSR Branch)

---

## Features

- OAuth Local Strategy
- Redux for global state, auth management (early decision - consider moving more towards Context)
- Context API for User session information (i.e. page retention, history)
- React Hooks for most cases
- Google Maps API Autocomplete Places
- Downshift for search functionality
- And more! 

## Usage (Optional)

- See SSR branch for a working, server-side-rendered version of the core functionality (rendering, redux store)

## Tests

- npm run test (Jest and Enzyme) Work in progress

---

## Contributions

> Open to any

