const { ObjectID } = require('mongodb');

module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) => {
        const details = {
            '_id': new ObjectID(req.params.id)
        };

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};