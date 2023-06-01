// controllers/reviews.js
import { pool } from '../db.js';

export const getAllReviews = (req, res) => {
    const query = 'SELECT * FROM reviews';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }

        connection.query(query,(error, result) => {
            connection.release();

            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
            console.log(result);
            let response =[]
            result.forEach(rev => {
                response.push({"message": `user met id: ${rev.id} succesvol opgehaald: ${rev.voornaam} ${rev.achternaam}   ${rev.score}  ${rev.review} ${rev.timestamp}`, status:200})
            })
            res
                .status(200)
                .json({response, status:200});   })
    })}
export const getReview = (req, res) => {
    const query = 'SELECT * FROM reviews WHERE id = (?)';
    const values =[+req.params.id];
    console.log(values)
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }

        connection.query(query, values, (error, result) => {
            connection.release();

            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
            console.log(result);
            res
                .status(200)
                .json({"message": `user met id: ${result[0].id} succesvol opgehaald: ${result[0].voornaam} ${result[0].achternaam} ${result[0].score} ${result[0].review} ${result[0].timestamp}`, status:200});   })
    })}
export const createReview = (req, res) => {
    const { voornaam, achternaam, score, review} = req.body;
    const query = 'INSERT INTO reviews (voornaam, achternaam, score, review, timestamp) VALUES (?, ?, ?, ?, ?)';
    const values =[voornaam, achternaam, +score, review, new Date().toISOString().slice(0,19).replace('T',' ')];
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }

        connection.query(query, values, (error, result) => {
            connection.release();

            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
    res
        .status(200)
        .json({"message": `user succesvol aangemaakt ${voornaam} ${achternaam} ${score} ${review}`, status:200});   })
    })
}
export const sortByDate = (req, res) => { const query = 'SELECT * FROM apireviews.reviews ORDER BY timestamp desc';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }

        connection.query(query, (error, result) => {
            connection.release();

            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
            console.log(result);
            let response =[]
            result.forEach(rev => {
                response.push({id: rev.id, voornaam: rev.voornaam, achternaam: rev.achternaam, score: rev.score, review: rev.review, timestamp: rev.timestamp.toISOString().slice(0,10)})
            })
            res
                .status(200)
                .json(response)
    })})}
export const sortByScore = (req, res) => { const query = 'SELECT * FROM apireviews.reviews ORDER BY reviews.score desc;';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }

        connection.query(query, (error, result) => {
            connection.release();

            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
            console.log(result);
            let response =[]
            result.forEach(rev => {
                response.push({id: rev.id, voornaam: rev.voornaam, achternaam: rev.achternaam, score: rev.score, review: rev.review, timestamp: rev.timestamp.toISOString().slice(0,10)})
            })
            res
                .status(200)
                .json(response)
    })})}