const jsonServer = require('json-server');
const multer = require('multer');

const server = jsonServer.create();
const rewriter = jsonServer.rewriter({
  '/article:id': '/index.html',
  '/newarticle': '/index.html',
  '/add': '/index.html'
});
const middlewares = jsonServer.defaults({
  static: './'
});
const router = jsonServer.router('db.json');
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: store });

server.post('/api/upload', upload.any(), (req, res) => {
  console.log(`>>> Upload ${req.files}`);
  res.status(200);
});
server.use(rewriter);
server.use(middlewares);
server.use('/api/db', router);

const port = 3000;
server.listen(port, () => {
  console.log(`>>> JSON Server is running on port ${port}`);
});
