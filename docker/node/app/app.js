const os = require('os');
const http = require('http');

http.createServer(function(request, response){
    response.end(os.hostname());
}).listen(process.env.LISTEN_PORT);

console.log('Server started on port ' + process.env.LISTEN_PORT);
