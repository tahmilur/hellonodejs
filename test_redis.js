// https://hackernoon.com/using-redis-with-node-js-8d87a48c5dd7
// https://redis.io/download
// https://hub.docker.com/_/redis
// https://phoenixnap.com/kb/docker-redis
// https://www.docker.com/docker-desktop/getting-started-for-windows
// https://phoenixnap.com/kb/redis-data-types-with-commands
// https://itnext.io/creating-an-expressjs-app-using-ejs-express-session-with-redis-9fee113023c6
// 

const HOST = '127.0.0.1'; 
const PORT = process.env.PORT || 3000; 
const REDIS_PORT = 5000; // process.env.REDIS_PORT || 6379;

const express = require('express');
const fetch = require("node-fetch");
const redis = require('redis');

// create express application instance
const app = express();

// var client = redis.createClient();
var client = redis.createClient(REDIS_PORT, HOST);

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

/*
client.set('my test key', 'my test value' , redis.print); 
client.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});
*/

// get photos list
app.get('/photos', (req, res) => {
 
    // key to store results in Redis store
    const photosRedisKey = 'user:photos';
 
    // Try fetching the result from Redis first in case we have it cached
    return client.get(photosRedisKey, (err, photos) => {
 
        // If that key exists in Redis store
        if (photos) {
 
            return res.json({ source: 'cache', data: JSON.parse(photos) })
 
        } else { // Key does not exist in Redis store
 
            // Fetch directly from remote api
            fetch('https://jsonplaceholder.typicode.com/photos')
                .then(response => response.json())
                .then(photos => {
 
                    // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
                    client.setex(photosRedisKey, 3600, JSON.stringify(photos))
 
                    // Send JSON response to client
                    return res.json({ source: 'api', data: photos })
 
                })
                .catch(error => {
                    // log error message
                    console.log(error)
                    // send error to the client 
                    return res.json(error.toString())
                })
        }
    });
});
 
// start express server at 3000 port
app.listen(3000, () => {
    console.log('Server listening on port: ', 3000)
});