const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const SQL = `
INSERT INTO items (type, name, path, sizes, stock) VALUES
('ski',   'Salomon QST',         'assets/skis/QST_PARK_S.png',  '142,148,152,158,162,172,178',     100),
('ski',   'Atomic Bent',         'assets/skis/s_qst_x.png',     '141,151,158,163,166,171,175',      65),
('ski',   'Rossignol Hero',      'assets/skis/stance80.png',     '140,145,150,155,160,170,175',      80),
('boot',  'Lange RS',            'assets/shoes/shoes0.png',      '38,39,40,41,42,43,44,45',          22),
('boot',  'Nordica Dobermann',   'assets/shoes/shoes1.png',      '38,39,40,41,42,43,44,45,46',       18),
('boot',  'Salomon X Pro',       'assets/shoes/shoes2.png',      '38,39,40,41,42,43,44',             15),
('stick', 'Leki Spark',          'assets/sticks/sticks0.png',    '105,110,115,120,125',             200),
('stick', 'Scott Team Issue',    'assets/sticks/sticks1.png',    '105,110,115,120,125,130',         170),
('stick', 'Dynastar Speedtour',  'assets/sticks/sticks2.png',    '100,120',                         170);
`;

async function seed() {
    let client;
    try {
        client = await db.connect();
        console.log("PostgreSQL connected");

        await client.query(SQL);
        console.log("Seed data inserted successfully (9 rows)");
    } catch (err) {
        console.error("Seed failed:", err.message);
        process.exit(1);
    } finally {
        if (client) client.release();
        await db.end();
    }
}

seed();
