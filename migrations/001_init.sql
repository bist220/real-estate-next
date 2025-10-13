-- Users
CREATE TABLE IF NOT EXISTS users (
id TEXT PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
role TEXT NOT NULL DEFAULT 'buyer',
name TEXT,
created_at INTEGER DEFAULT (strftime('%s','now'))
);


-- Properties
CREATE TABLE IF NOT EXISTS properties (
id TEXT PRIMARY KEY,
-- slug TEXT UNIQUE NOT NULL,
name TEXT NOT NULL,
builder TEXT,
price INTEGER NOT NULL,
location TEXT,
description TEXT,
images TEXT,
owner_id TEXT,
created_at INTEGER DEFAULT (strftime('%s','now')),
updated_at INTEGER DEFAULT (strftime('%s','now'))
);


-- Interests
CREATE TABLE IF NOT EXISTS interests (
id TEXT PRIMARY KEY,
property_id TEXT,
user_id TEXT,
message TEXT,
created_at INTEGER DEFAULT (strftime('%s','now'))
);