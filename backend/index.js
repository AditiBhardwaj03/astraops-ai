const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		service: "astraops-backend",
		timestamp: new Date().toISOString(),
	});
});

app.get("/api/message", (req, res) => {
	app.get("/api/message", (req, res) => {
		res.json({
			message:
				"AstraOps backend is live. CI/CD, Docker, and Kubernetes integration verified.",
		});
	});
});

app.listen(PORT, () => {
	console.log(`Backend running on port ${PORT}`);
});
