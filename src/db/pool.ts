//config object for postgresql
import { Pool, PoolClient } from 'pg';
import 'dotenv/config';

// const db_url = process.argv[2];
// console.log(db_url);
const db_url = process.env.NEON_URI;

//all of the following properties should be read from environment variables
export const pool = new Pool({
	connectionString: db_url,
	max: 20,
	idleTimeoutMillis: 3 * 10 ** 4,
	connectionTimeoutMillis: 2 * 10 ** 3,
});
pool.on('connect', (client: PoolClient) => {
	console.log('A new client has connected');
});
pool.on('error', (error, client: PoolClient) => {
	console.error('Unexpected error on idle client: ', error);
});

//test the connection
export async function testConnection() {
	const client = await pool.connect();
	try {
		const result = await client.query('SELECT NOW()');
		console.log('Connection successful, server time is:', result.rows[0]);
	} catch (error) {
		console.error('Error testing connection:', error);
	} finally {
		client.release();
	}
}
testConnection();

export interface userInfo {
	firstname: string;
	lastname: string;
	age: number;
	email: string;
	bio?: string;
	id?: number;
}
