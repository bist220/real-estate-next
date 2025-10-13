import fs from 'fs';
import Database from 'better-sqlite3';

const dbFile = './d1.sqlite';
const sql = fs.readFileSync('../migrations/001_init.sql', 'utf-8');


const db = new Database(dbFile);
try {
    db.exec('PRAGMA foreign_keys = ON;');
    db.exec(sql);
    console.log('Migrations applied to', dbFile);
} catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
} finally {
    db.close();
}