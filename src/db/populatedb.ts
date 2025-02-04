#! /usr/bin/env node

import { Client } from 'pg';
import 'dotenv/config';

// const db_url = process.argv[2];
const db_url = process.env.NEON_URI;

const SQL = `
CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
firstname VARCHAR (255),
lastname VARCHAR (255),
email VARCHAR (255),
age INTEGER,
bio VARCHAR(200)
);

INSERT INTO messages (firstname,lastname,email,age,bio) VALUES
('Alice', 'Smith', 'alice.smith@example.com', 32, 'Excited to join the community!'),
('Bob', 'Johnson', 'bob.johnson@example.com', 45, 'Looking forward to learning new things.'),
('Carol', 'Williams', 'carol.williams@example.com', 27, 'Happy to be part of the team!'),
('David', 'Brown', 'david.brown@example.com', 36, 'Eager to start new projects.'),
('Eve', 'Davis', 'eve.davis@example.com', 29, 'Thrilled to connect and collaborate!') `;

async function main() {
	console.log('seeding...');
	try {
		const client = new Client({
			connectionString: db_url,
			//adding good practices for pool
			connectionTimeoutMillis: 2 * 10 ** 3,
		});
		await client.connect();
		await client.query(SQL);
		await client.end();
		console.log('done');
	} catch (error) {
		console.error('Error: ', error);
	}
}

main();
