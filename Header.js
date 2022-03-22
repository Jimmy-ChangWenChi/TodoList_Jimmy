const Headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

const Request_Method = {
    GET:"GET",
    POST:"POST",
    DELETE:"DELETE",
    PATCH:"PATCH"
}


module.exports = {
    Headers,
    Request_Method
}