import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("genemoa.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    hashed_password TEXT NOT NULL,
    organization TEXT,
    bio TEXT,
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS predictions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    sample_id TEXT,
    model_id TEXT,
    input_data TEXT,
    top_predictions TEXT,
    shap_values TEXT,
    runtime_seconds REAL,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS batch_jobs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    status TEXT,
    progress REAL,
    results TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

const app = express();
app.use(express.json({ limit: '50mb' }));

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-change-me");

// Auth Middleware
const authenticate = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  
  const token = authHeader.split(" ")[1];
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// API Routes
app.post("/api/auth/register", async (req, res) => {
  const { email, password, full_name, organization } = req.body;
  const id = crypto.randomUUID();
  const hashedPassword = await bcrypt.hash(password, 12);
  
  try {
    db.prepare("INSERT INTO users (id, email, full_name, hashed_password, organization) VALUES (?, ?, ?, ?, ?)")
      .run(id, email, full_name, hashedPassword, organization);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  
  if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  const token = await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(JWT_SECRET);
    
  res.json({ token, user: { id: user.id, email: user.email, full_name: user.full_name } });
});

app.get("/api/auth/me", authenticate, (req: any, res) => {
  const user = db.prepare("SELECT id, email, full_name, organization, bio, avatar_url FROM users WHERE id = ?").get(req.user.id);
  res.json(user);
});

// Prediction Logic
app.post("/api/predictions/save", authenticate, async (req: any, res) => {
  const { sample_id, model_id, gene_data, result, runtime } = req.body;
  
  try {
    const prediction_id = crypto.randomUUID();
    
    db.prepare(`
      INSERT INTO predictions (id, user_id, sample_id, model_id, input_data, top_predictions, shap_values, runtime_seconds, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      prediction_id, 
      req.user.id, 
      sample_id, 
      model_id, 
      JSON.stringify(gene_data), 
      JSON.stringify(result.top_predictions), 
      JSON.stringify({ narrative: result.xai_narrative, genes: result.important_genes }),
      runtime,
      "completed"
    );

    res.json({ id: prediction_id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save prediction" });
  }
});

app.get("/api/predictions", authenticate, (req: any, res) => {
  const predictions = db.prepare("SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
  res.json(predictions.map((p: any) => ({
    ...p,
    top_predictions: JSON.parse(p.top_predictions || "[]"),
    shap_values: JSON.parse(p.shap_values || "{}")
  })));
});

app.get("/api/predictions/:id", authenticate, (req: any, res) => {
  const p: any = db.prepare("SELECT * FROM predictions WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json({
    ...p,
    top_predictions: JSON.parse(p.top_predictions || "[]"),
    shap_values: JSON.parse(p.shap_values || "{}")
  });
});

// Assistant Chat - Removed as it's now frontend-only
app.post("/api/assistant/chat", authenticate, async (req: any, res) => {
  res.status(404).json({ error: "Endpoint moved to client-side" });
});


async function startServer() {
  const PORT = 3000;
  
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist/index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
