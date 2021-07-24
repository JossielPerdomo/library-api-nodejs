const express = require('express');
const routes = express.Router();

// routes

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM books', (err, rows) => {
            if(err) return res.send(err)

            //console.log(rows);
            res.json(rows);
        })
    });
});

routes.post('/', (req, res) => {
    if(req.body.edition < 1){
        return res.status(400).send('The edit cannot be a negative number');
    }
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM books WHERE edition=? and title=?', 
        [req.body.edition, req.body.title], (err, rows) => {
            if(err) return res.send(err)

            if(rows.length > 0){
                return res.status(400).send('The book already exists');
            }else{
                conn.query('INSERT INTO books set ?', 
                [req.body], (err, rows) => {
                    if(err) return res.send(err)
                
                    res.send('book added');
                })
            }
        });
        
    });
});

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('DELETE FROM books WHERE id=?', [req.params.id], (err) => {
            if(err) return res.send(err)

            res.send('book deleted');
        })
    });
});

routes.put('/:id', (req, res) => {
    if(req.body.edition < 1){
        return res.status(400).send('The edit cannot be a negative number');
    }

    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM books WHERE edition=? and title=?', 
        [req.body.edition, req.body.title], (err, rows) => {

            if(err) return res.send(err)

            if(rows.length > 0){
                return res.status(400).send('The book already exists');
            }else{
                conn.query('UPDATE books set ? WHERE id=?', 
                [req.body, req.params.id], (err) => {
                    if(err) return res.send(err)
        
                    res.send('book updated');
                });
            }

        });

    });
});

module.exports = routes;