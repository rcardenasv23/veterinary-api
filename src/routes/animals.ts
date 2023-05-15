import { Router } from "express";
import { animalsControllers } from "../controllers/animalsController";

const animalsRouter = Router();

/*GET*/
animalsRouter.get("/", animalsControllers.listAnimals);

module.exports = animalsRouter;
