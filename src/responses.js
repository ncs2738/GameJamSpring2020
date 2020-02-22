const fs = require('fs'); 
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getResponse = (request, response, statusCode, contentType, content) => 
{
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

const AlphaNum = 
{
    "/Q" : 2,
    "/W" : 24,
    "/E" : 7,
    "/R" : 14,
    "/T" : 5,
    "/Y" : 24,
    "/A" : 11,
    "/S" : 24,
    "/D" : 19,
    "/F" : 24,
    "/G" : 9,
    "/H" : 1,
};

const LetPos = 
{
    "/Q" : 3,
    "/W" : "1, 2, 11, 12",
    "/E" : 5,
    "/R" : 7,
    "/T" : 8,
    "/Y" : "1, 2, 11, 12",
    "/A" : 10,
    "/S" : "1, 2, 11, 12",
    "/D" : 6,
    "/F" : "1, 2, 11, 12",
    "/G" : 4,
    "/H" : 9,
};


const handler = (request, response, acceptedTypes, pathway) =>
{
    const responseObj = 
    {
        message: '',
    };

    if (acceptedTypes[0] === 'LOCATION') 
    {
        let num = LetPos[pathway];
        responseObj.message = num;

        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;
        getResponse(request, response, 200, 'text/xml', responseXML);
    }
    else
    {
        let num = AlphaNum[pathway];
        responseObj.message = num;

        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;
        getResponse(request, response, 200, 'text/xml', responseXML);
    }
};

const getIndex = (request, response) =>
{
    getResponse(request, response, 200, 'text/html', index)
};

const getCSS = (request, response) =>
{
    getResponse(request, response, 200, 'text/css', css)
};

const notFound = (request, response, acceptedTypes) =>
{
    const responseObj = 
    {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    sendResponse(request, response, acceptedTypes, responseObj, 404);
};

module.exports = 
{
    getIndex,
    getCSS,
    notFound,
    handler
};
