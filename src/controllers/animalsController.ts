import { Request, Response } from "express";
import { animalsRepository } from "../repositories/animalsRepository";

async function listAnimals(req: Request, res: Response) {
  let animals = await animalsRepository.listAnimals();
  res.status(200);
  res.send({ body: animals });
}

export const animalsControllers = Object.freeze({
  listAnimals,
});
