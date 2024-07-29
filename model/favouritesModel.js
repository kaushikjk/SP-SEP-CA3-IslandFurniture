var db = require('./databaseConfig.js');

var favoritesDB = {
    addToFavorites: function (userEmail, furniture) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    conn.end();
                    return reject(err);
                } else {
                    var sql = 'INSERT INTO favorites (user_email, furniture_id, sku, name, img_url) VALUES (?, ?, ?, ?, ?)';
                    conn.query(sql, [userEmail, furniture.id, furniture.sku, furniture.name, furniture.imgURL], function (err, result) {
                        conn.end();
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(true);
                        }
                    });
                }
            });
        });
    },
    getFavorites: function (userEmail) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    conn.end();
                    return reject(err);
                } else {
                    var sql = 'SELECT * FROM favorites WHERE user_email = ?';
                    conn.query(sql, [userEmail], function (err, result) {
                        conn.end();
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(result);
                        }
                    });
                }
            });
        });
    }
};

module.exports = favoritesDB;
