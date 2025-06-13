import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { query } = req.body;
      db.all(query, [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ results: rows });
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};