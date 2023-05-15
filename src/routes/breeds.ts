import { Router } from "express";
import { breedsControllers } from "../controllers/breedsController";

const breedsRouter = Router();

/*GET*/
breedsRouter.get("/", breedsControllers.listBreeds);
breedsRouter.get("/sizes", breedsControllers.listSizes);

module.exports = breedsRouter;
