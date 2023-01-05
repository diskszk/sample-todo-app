import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

if (admin.apps.length === 0) {
  admin.initializeApp();
}
import * as express from "express";
import todosRouter from "./todos/controller";

const app = express();
app.use(todosRouter);

export const api = functions.region("asia-northeast1").https.onRequest(app);
