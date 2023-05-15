import { Request, Response } from "express";
import { petRepository } from "../repositories/petsRepository";
import {
  AddPetInput,
  AddPetOutPut,
  addPetWithBreedInteractor,
  addPetWithOutBreedInteractor,
  parserBody,
} from "../interactors/pets/addPetInteractor";
import { Types } from "mongoose";
import { updatePetInteractor } from "../interactors/pets/updatePetInteractor";
import {
  FilterInputInterface,
  parserBodyFilter,
} from "../interactors/pets/filterPets";

async function listPets(req: Request, res: Response) {
  const body = await petRepository.listPets();
  res.status(200);
  res.send({ body });
}

async function filterPets(req: Request, res: Response) {
  try {
    let parsedBody: FilterInputInterface = parserBodyFilter(req.body);
    let filters = await petRepository.filterList(parsedBody);
    res.status(200);
    res.send({ status: "done", body: filters });
  } catch (e) {
    res.status(500);
    res.send("Error while parsing filters");
  }
}

async function getPet(req: Request, res: Response) {
  if (req.params.id) {
    const body = await petRepository.getPet(req.params.id as string);
    res.send({ status: "done", body });
  } else {
    res.status(200);
    res.send({ status: "error", body: "No id." });
  }
}

async function updatePet(req: Request, res: Response) {
  try {
    parserBody(req.body);
    let updatedPet = updatePetInteractor(req.body);
    res.status(200);
    res.send({ status: "done", body: updatedPet });
  } catch (e: any) {
    res.status(200);
    console.log(e);
    res.send({ status: "error", body: e.message });
  }
}

async function addPet(req: Request, res: Response) {
  try {
    parserBody(req.body);
    let newPet: AddPetInput;
    if (Types.ObjectId.isValid(req.body.breed)) {
      newPet = {
        name: req.body.name,
        breed: new Types.ObjectId(req.body.breed),
        description: req.body.description,
      };
      let pet: AddPetOutPut = await addPetWithBreedInteractor(newPet);
      if (pet._id) {
        res.status(200);
        res.send({ status: "done", body: pet });
      } else {
        res.status(200);
        res.send({ status: "error", body: "Error while creating pet" });
      }
    } else if (req.body.animal) {
      newPet = {
        name: req.body.name,
        breed: req.body.breed,
        size: req.body.size,
        description: req.body.description,
        animal: req.body.animal,
      };
      let pet: AddPetOutPut = await addPetWithOutBreedInteractor(newPet);
      if (pet._id) {
        res.status(200);
        res.send({ status: "done", body: pet });
      } else {
        res.status(200);
        res.send({ status: "error", body: "Error while creating pet" });
      }
    }
  } catch (e: any) {
    res.status(500);
    console.log(e);
    res.send({ status: "error", error: e.message });
  }
}

async function deletePet(req: Request, res: Response) {
  if (Types.ObjectId.isValid(req.query.id as string)) {
    const body = await petRepository.deletePet(req.query.id as string);
    if (body?._id) {
      res.status(200);
      res.send({ status: "done", body });
    } else {
      res.status(200);
      res.send({ status: "error", body: "Erro while deleting pet" });
    }
  } else {
    res.status(500);
    res.send("Invalid id.");
  }
}

export const petsControllers = Object.freeze({
  listPets,
  addPet,
  deletePet,
  getPet,
  updatePet,
  filterPets,
});
