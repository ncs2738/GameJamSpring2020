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
    "Q" : 24,
    "W" : 24,
    "E" : 2,
    "R" : 9,
    "T" : 7,
    "Y" : 19,
    "A" : 14,
    "S" : 5,
    "D" : 1,
    "F" : 11,
    "G" : 24,
    "H" : 24,
};

const LetPos = 
{
    "Q" : "1, 2, 10, 11",
    "W" : "1, 2, 10, 11",
    "E" : 2,
    "R" : 9,
    "T" : 7,
    "Y" : 19,
    "A" : 14,
    "S" : 5,
    "D" : 1,
    "F" : 11,
    "G" : "1, 2, 10, 11",
    "H" : "1, 2, 10, 11",
};


const handler = (request, response, acceptedTypes, pathway) =>
{
    const responseObj = 
    {
        message: '',
    };

    if (acceptedTypes[0] === 'text/xml') 
    {
        let num = LetPos[pathway];
        console.log(num);

        responseObj.message = num;

        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;
        getResponse(request, response, 200, 'text/xml', responseXML);
    }
    else
    {
        let num = AlphaNum[pathway];
        console.log(num);
        responseObj.message = num;

        const message = JSON.stringify(responseObj);
        getResponse(request, response, 200, 'application/json', message);
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
