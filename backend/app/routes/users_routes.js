module.exports = function (app, db) {
    app.get('/users/oid/:oid', (req, res) => {
        const details = {
            'oid': req.params.oid
        };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    });

    app.get('/users/username/:username', (req, res) => {
        const details = {
            'username': req.params.username
        };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    });

    app.get('/users', (req, res) => {
        const details = {
            'username': req.body.username,
            'oid': req.body.oid
        };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    })

    app.post('/users', (req, res) => {
        const user = {
            username: req.body.username,
            oid: req.body.oid,
            friendships: {
                friends: [],
                incoming: [],
                outgoing: []
            },
            events: []
        }

        const details = {
            $or: [
                {'username': user.username},
                {'oid': user.oid}
            ]
        };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else if (!item) {
                db.collection('users').insertOne(user, (err, result) => {
                    if (err) {
                        res.send({
                            'error': 'An error has occured'
                        });
                    } else {
                        res.send(result.ops[0]);
                    }
                });
            } else {
                res.send({
                    'error': 'Username or OID is already taken'
                });
            }
        });
    });
};