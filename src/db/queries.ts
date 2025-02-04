import { pool, userInfo } from './pool';

export async function getUsers(): Promise<userInfo[][]> {
	//have to connect first
	try {
		let { rows } = await pool.query('SELECT * FROM messages');
		console.log(rows);
		rows = rows as userInfo[][];
		//2d array so need to flatten it to an array of objects

		return rows as userInfo[][];
	} catch (error) {
		console.error('Error getting usernames.');
		throw error;
	} finally {
	}
}


export async function searchRecord(record: userInfo) {
	//two cases: Search by email and search by firstname&&lastname
	try {
		await pool.query('SELECT * FROM messages WHERE firstname = ')
	}
}
export async function insertRecord(record: userInfo): Promise<void> {
	try {
		await pool.query(
			'INSERT INTO usernames (username) VALUES ($5)',
			Array(record),
		);
	} catch (error) {
		console.error('Error inserting into usernames.');
		throw error;
	}
}


