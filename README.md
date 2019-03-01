# Arduino Morse Service

This is the backend to the that is contacted by this: https://github.com/ITViking/morse-frontend

The backend has a couple of api. It's a very small app.

## The endpoints

### / GET

Returns an array of JSON data.

### / POST

Accepts a JSON object containging a property of message ei: {"message": "Hi there..." }

### /messages

SSE endpoint which continually will forward any incoming messages recieved from the "/ POST" endpoint

## How to use

* clone repo

* enter repo via terminal

* enter the following command into the terminal: node index.js

The terminal should now tell you what port you listening for.

Please change the IP address in index.js to match that of your subenet while testing.
