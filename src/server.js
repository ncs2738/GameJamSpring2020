const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,

  '/Q' : responseHandler.handler,
  '/W' : responseHandler.handler,
  '/E' : responseHandler.handler,
  '/R' : responseHandler.handler,
  '/T' : responseHandler.handler,
  '/Y' : responseHandler.handler,
  '/A' : responseHandler.handler,
  '/S' : responseHandler.handler,
  '/D' : responseHandler.handler,
  '/F' : responseHandler.handler,
  '/G' : responseHandler.handler,
  '/H' : responseHandler.handler,

  '/notFound' : responseHandler.notFound,
  index: responseHandler.getIndex,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    if (urlStruct[parsedUrl.pathname]) 
    {
      urlStruct[parsedUrl.pathname](request, response, acceptedTypes, request.url);
    } 
    else
    {
        urlStruct.notFound(request, response, acceptedTypes);
    }
  };
  http.createServer(onRequest).listen(port);
  
  console.log(`Listening on 127.0.0.1: ${port}`);