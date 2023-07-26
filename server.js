import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
  
	let sql = `SELECT * FROM movies`;
	
	connection.query(sql, (error, results, fields) => {
	
		if (error) {
			return res.status(500).send({ error: 'Error retrieving movies' });
		}
		
		//reformats the data to have id as the key for the other data
		const movies = results.reduce((acc, movie) => {
			const { id, name, year, quality } = movie;
			acc[id] = {name, year, quality };
			return acc;
		}, {});

		//sends back movie table data
		res.send(JSON.stringify(movies));
	});
	
	
	connection.end();
  });

app.post('/api/addReview', (req, res) => {

	//get values for sql statement
	const values = [
		req.body.movieID,
		req.body.userID,
		req.body.reviewTitle,
		req.body.reviewContent,
		req.body.reviewScore
	];

	//start connection
	const connection = mysql.createConnection(config);

	//statement for adding the new review to the table
	const sql = `INSERT INTO Review (movieID, userID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;

	//tries query
	connection.query(sql, values, (error, results, fields) => {
		if (error) {
			//throws error if error from query
			console.error('Error adding review:', error);
			return res.status(500).send({ error: 'Error adding review' });
		}
		
		//sends back okay
		res.sendStatus(200);
	});

	connection.end();
});

app.post('/api/searchMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let values = [
		`%${req.body.enteredMovie}%`,
		`%${req.body.enteredActor}%`,
		`%${req.body.enteredDirector}%`
	];
	
	console.log(values);
	
	let sql = `SELECT movies.name AS movie_name, 
	CONCAT(directors.first_name, " ", directors.last_name) AS director_name, 
	GROUP_CONCAT(DISTINCT Review.reviewContent) AS reviews, 
	AVG(Review.reviewScore) AS average_score
	FROM movies
	LEFT JOIN movies_directors ON movies.id = movies_directors.movie_id
	LEFT JOIN directors ON movies_directors.director_id = directors.id
	LEFT JOIN Review ON movies.id = Review.movieID
	LEFT JOIN roles ON movies.id = roles.movie_id
	WHERE movies.name LIKE ?
	AND roles.actor_id IN (SELECT id FROM actors WHERE CONCAT(first_name, " ", last_name) LIKE ?)
	AND CONCAT(directors.first_name, " ", directors.last_name) LIKE ?
	GROUP BY movies.id, directors.id;`;
	
	connection.query(sql, values, (error, results, fields) => {
		if (error) {
			return res.status(500).send({ error: 'Error searching movies' });
		}
		
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	
	connection.end();
});

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server