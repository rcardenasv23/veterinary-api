import { Request, Response } from "express";
import { breedRepository } from "../repositories/breedsRepository";

async function listBreeds(req: Request, res: Response) {
  let breeds = await breedRepository.listBreeds();
  if (breeds) {
    res.status(200);
    res.send({ status: "done", body: breeds });
  } else {
    res.status(200);
    res.send({ status: "error", body: "Error while gettin breeds" });
  }
}

async function listSizes(req: Request, res: Response) {
  let sizes = await breedRepository.listSizes();
  if (sizes) {
    res.status(200);
    res.send({ status: "done", body: sizes });
  } else {
    res.status(200);
    res.send({ status: "error", body: "Error while gettin sizes" });
  }
}

export const breedsControllers = Object.freeze({
  listBreeds,
  listSizes,
});
