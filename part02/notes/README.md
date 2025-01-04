# json server

install `npm install -g json-server` or `npm install json-server --save-dev` for developer dependency

start `json-server --port 3001 --watch db.json` or `npx json-server --port 3001 --watch db.json`

- the `--watch` option automatically looks for any saved changes to `db.json`

you can include additional script for the json-server in package.json

```json
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",

    "server": "json-server -p3001 --watch db.json"
  }
}
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
