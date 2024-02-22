import express from "express";
import {getUSersForSidebar} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/', protectRoute, getUSersForSidebar);


export default router;