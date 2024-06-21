const http = require('http');

const DEFAULT_USER = {
  username: 'pedro',
  password: 'password',
};

const { once } = require('events');

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact us page');
    res.end();
  },
  // curl -i -X POST --data '{"username":"pedro","password":"password"}' localhost:3000/login
  '/login:post': async (req, res) => {
    const data = JSON.parse(await once(req, 'data'));
    if (
      data.username !== DEFAULT_USER.username ||
      data.password !== DEFAULT_USER.password
    ) {
      res.writeHead(401);
      res.end('Invalid credentials');
      return;
    }
    return res.end(`Logged in as ${data.username}`);
  },
  default: (req, res) => {
    res.writeHead(404);
    res.end('Page not found');
  },
};
function handleRequest(req, res) {
  const { url, method } = req;

  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(req, res);
}

const server = http.createServer(handleRequest).listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = server;
