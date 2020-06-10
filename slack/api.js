const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Slack router is working!')
})

//Once this is pushed to master and deployed we will need to hook up 
//the challenge url using the slack application
router.post('/events', (req, res) => {
    console.log(req.body)
    if(req.body.challenge) {
        res.status(200);
        res.contentType('text/plain');
        console.log(req.body)
        res.send(req.body.challenge);
    } else {
        console.log('Slack Payload: ' + req.body.event);
    }
})

module.exports = router;