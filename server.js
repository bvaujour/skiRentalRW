const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch(err => console.error("PostgreSQL connection error:", err));

app.get("/api/:type", async (req, res) =>
{
	const { type } = req.params;
	const allowed = ["ski", "boot", "stick"];

	if (!allowed.includes(type))
		return res.status(400).json({ error: "invalid type" });

	const result = await db.query("SELECT * FROM items WHERE type = $1 ORDER BY id",[type]);

	res.json(result.rows);
});

app.get("/health", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.json({ status: "ok", db: "connected" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "db error", error: err.message });
    }
});


app.post("/api/reserve", async (req, res) =>
{
	console.log(req.body);

	const { ski_id, boot_id, stick_id } = req.body;

	if (!ski_id || !boot_id || !stick_id)
		return res.status(400).json({ error: "missing data" });

	await db.query("UPDATE items SET stock = stock - 1 WHERE id = $1 AND stock > 0", [ski_id]);
	await db.query("UPDATE items SET stock = stock - 1 WHERE id = $1 AND stock > 0", [boot_id]);
	await db.query("UPDATE items SET stock = stock - 1 WHERE id = $1 AND stock > 0", [stick_id]);

	res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
{
	console.log(`backend running on port ${PORT}`);
});
