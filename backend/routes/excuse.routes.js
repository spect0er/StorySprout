import express from "express";
import {  createExcuse } from "../controller/excuse.controller.js";

const router = express.Router();

router.post("/", createExcuse);


export const excuseRoutes = router;
