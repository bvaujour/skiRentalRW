const express = require("express");
const { Pool } = require("pg");
const app = express();


app.use(express.json());

const db = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

app.get("/api/:type", async (req, res) =>
{
	const { type } = req.params;
	const allowed = ["ski", "boot", "stick"];

	if (!allowed.includes(type))
		return res.status(400).json({ error: "invalid type" });

	const result = await db.query("SELECT * FROM items WHERE type = $1 ORDER BY id",[type]);

	res.json(result.rows);
});


app.post("/api/reserve/:type/:id", async (req, res) =>
{
	const { type, id } = req.params;
	const allowed = ["ski", "boot", "stick"];

	if (!allowed.includes(type))
		return res.status(400).json({ error: "invalid type" });
	try
	{
		const result = await db.query("SELECT * FROM items WHERE type = $1 AND id = $2", [type, id]);
		const item = result.rows[0];

		if (!item)
			return res.status(404).json({ error: "not found" });
		if (item.stock <= 0)
			return res.status(400).json({ error: "out of stock" });
		await db.query("UPDATE items SET stock = stock - 1 WHERE id = $1", [id]);
		res.json({ success: true });

	}
	catch (err)
	{
		console.error(err);
		res.status(500).json({ error: "server error" });
	}
});

app.listen(3000, () =>
{
	console.log("backend running");
});