import { Router } from "express";
import { petsControllers } from "../controllers/petsController";

const petsRouter = Router();

/*GET*/
petsRouter.get("/", petsControllers.listPets);
petsRouter.get("/:id", petsControllers.getPet);

/*POST*/
petsRouter.post("/", petsControllers.addPet);
petsRouter.post("/filter", petsControllers.filterPets);

/*UPDATE */
petsRouter.put("/", petsControllers.updatePet);

/*DELETE*/
petsRouter.delete("/", petsControllers.deletePet);

module.exports = petsRouter;
