const roomData = require('../models/roomData');
const { router } = require("./api");

//get room data from mongo db
router.get('/rooms', function (req, res, next) {
    roomData.find({}).then(function (rooms) {
        res.send(rooms);
    }).catch(next);
});
