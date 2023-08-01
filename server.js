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

// Route for searching movies based on user input
app.post('/api/searchMovies', (req, res) => {
	// Create a MySQL connection using the provided config
	let connection = mysql.createConnection(config);
	
	// Prepare the values for the SQL query using user input (enteredMovie, enteredActor, enteredDirector)
	let values = [
		`%${req.body.enteredMovie}%`,
		`%${req.body.enteredActor}%`,
		`%${req.body.enteredDirector}%`
	];
	
	// SQL query to retrieve movie details, director names, reviews, and average review score
	let sql = `SELECT mv.name AS movie_name, 
		CONCAT(dir.first_name, " ", dir.last_name) AS director_name, 
		GROUP_CONCAT(DISTINCT rev.reviewContent) AS reviews, 
		AVG(rev.reviewScore) AS average_score
		FROM movies AS mv
		LEFT JOIN movies_directors AS md ON mv.id = md.movie_id
		LEFT JOIN directors AS dir ON md.director_id = dir.id
		LEFT JOIN Review AS rev ON mv.id = rev.movieID
		LEFT JOIN roles AS r ON mv.id = r.movie_id
		WHERE mv.name LIKE ?
		AND r.actor_id IN (SELECT a.id FROM actors AS a WHERE CONCAT(a.first_name, " ", a.last_name) LIKE ?)
		AND CONCAT(dir.first_name, " ", dir.last_name) LIKE ?
		GROUP BY mv.id, dir.id;`;
	
	// Execute the SQL query with the prepared values
	connection.query(sql, values, (error, results, fields) => {
		if (error) {
			// Handle any errors that occurred during the query
			return res.status(500).send({ error: 'Error searching movies' });
		}
		
		// Convert the query results to a JSON string and send it in the response
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	
	// Close the MySQL connection
	connection.end();
});

// Route for getting random movie trivia
app.post('/api/getTrivia', (req, res) => {
	// Create a MySQL connection using the provided config
	let connection = mysql.createConnection(config);
  
	// SQL query to retrieve random movie trivia (movie title, year, and director name)
	let sql = `SELECT movie_title, movie_year, director_name
		FROM (
			SELECT movies.name AS movie_title, movies.year AS movie_year, 
				CONCAT(directors.first_name, " ", directors.last_name) AS director_name,
				ROW_NUMBER() OVER (PARTITION BY directors.id ORDER BY RAND()) AS rn
			FROM directors
			JOIN movies_directors ON directors.id = movies_directors.director_id
			JOIN movies ON movies_directors.movie_id = movies.id
			WHERE movies.id NOT IN (
				SELECT movie_id
				FROM movies_directors
				GROUP BY movie_id
				HAVING COUNT(DISTINCT director_id) > 1
			)
		) AS subquery
		WHERE rn = 1
		ORDER BY RAND()
		LIMIT 4;
		`;
	
	// Execute the SQL query to retrieve random movie trivia
	connection.query(sql, (error, results, fields) => {
	
		if (error) {
			// Handle any errors that occurred during the query
			return res.status(500).send({ error: 'Error retrieving movies' });
		}
		
		// Convert the query results to a JSON string and send it in the response
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	
	// Close the MySQL connection
	connection.end();
});

app.post('/api/addAttempt', (req, res) => {

	//get values for sql statement
	const values = [
		req.body.currentScore,
		req.body.userID
	];

	//start connection
	const connection = mysql.createConnection(config);

	//statement for adding the new attempt to the table
	const sql = `INSERT INTO triviaAttempt (score, userID) VALUES (?, ?)`;

	//tries query
	connection.query(sql, values, (error, results, fields) => {
		if (error) {
			//throws error if error from query
			console.error('Error adding attempt:', error);
			return res.status(500).send({ error: 'Error adding review' });
		}
		
		//sends back okay
		res.sendStatus(200);
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