import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getUsersForSidebar); //protects unauthorized access to the route


export default router;  //exporting the router to use it in server.js