import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

admin.initializeApp();
const app = express();

app.get("/helloworld", (req, res) => {
  res.json("Hello Express");
});

export const api = functions.region("asia-northeast1").https.onRequest(app);
