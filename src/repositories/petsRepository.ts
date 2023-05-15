import { AddPetInput } from "../interactors/pets/addPetInteractor";
import petModel from "../models/pet";
import { ListPetInterface } from "../interactors/pets/listPetInteractor";
import { Types } from "mongoose";
import { UpdatePetInput } from "../interactors/pets/updatePetInteractor";
import { FilterInputInterface } from "../interactors/pets/filterPets";

async function listPets(): Promise<Array<ListPetInterface>> {
  const pets = await petModel.aggregate([
    {
      $lookup: {
        from: "breeds",
        localField: "breed",
        foreignField: "_id",
        as: "breed",
      },
    },
    {
      $unwind: "$breed",
    },
    {
      $lookup: {
        from: "animals",
        localField: "breed.animal",
        foreignField: "_id",
        as: "breed.animal",
      },
    },
    {
      $unwind: "$breed.animal",
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        breed: {
          _id: "$breed._id",
          breed: "$breed.breed",
          size: "$breed.size",
        },
        animal: {
          _id: "$breed.animal._id",
          name: "$breed.animal.name",
        },
      },
    },
  ]);
  return pets;
}

async function filterList(filterInput: FilterInputInterface) {
  let lookUpFilters = [];
  if (filterInput.animals?.length > 0) {
    console.log("filtros de animal");
    lookUpFilters.push({
      $match: {
        "animal._id": {
          $in: filterInput.animals.map(
            (animalId) => new Types.ObjectId(animalId)
          ),
        },
      },
    });
  }
  if (filterInput.breeds?.length > 0) {
    console.log("filtros de breed");
    lookUpFilters.push({
      $match: {
        "breed._id": {
          $in: filterInput.breeds.map((breedId) => new Types.ObjectId(breedId)),
        },
      },
    });
  }
  let pets = await petModel.aggregate([
    {
      $lookup: {
        from: "breeds",
        localField: "breed",
        foreignField: "_id",
        as: "breed",
      },
    },
    {
      $unwind: "$breed",
    },
    {
      $lookup: {
        from: "animals",
        localField: "breed.animal",
        foreignField: "_id",
        as: "animal",
      },
    },
    ...lookUpFilters,
  ]);

  return pets;
}

async function getPet(id: string) {
  const pets = await petModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "breeds",
        localField: "breed",
        foreignField: "_id",
        as: "breed",
      },
    },
    {
      $unwind: "$breed",
    },
    {
      $lookup: {
        from: "animals",
        localField: "breed.animal",
        foreignField: "_id",
        as: "breed.animal",
      },
    },
    {
      $unwind: "$breed.animal",
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        breed: {
          _id: "$breed._id",
          breed: "$breed.breed",
          size: "$breed.size",
        },
        animal: {
          _id: "$breed.animal._id",
          name: "$breed.animal.name",
        },
      },
    },
  ]);
  return pets;
}

async function addPet(newPet: AddPetInput) {
  const pet = await petModel.create(newPet);
  return pet;
}

async function updatePet(pet: UpdatePetInput) {
  const updatedPet = await petModel.findByIdAndUpdate(pet._id, pet, {
    new: true,
  });
  return updatedPet;
}

async function deletePet(id: string) {
  const deletePet = await petModel.findByIdAndDelete(id);
  return deletePet;
}

export const petRepository = Object.freeze({
  listPets,
  addPet,
  filterList,
  deletePet,
  getPet,
  updatePet,
});
