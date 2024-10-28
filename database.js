const { Surreal } = 'surrealdb.js';
const { surrealdbNodeEngines } = 'surrealdb.node';

const db = new Surreal({
    engines: surrealdbNodeEngines(),
});

await db.connect("mem://");

exports.db = db;

