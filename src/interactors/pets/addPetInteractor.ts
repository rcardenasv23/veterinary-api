import { Types } from "mongoose";
import { breedRepository } from "../../repositories/breedsRepository";
import { petRepository } from "../../repositories/petsRepository";
import { addBreedInteractor } from "../breeds/addBreedsInteractor";

export interface AddPetInput {
  name: string;
  breed: string | Types.ObjectId;
  size?: string;
  description: string;
  animal?: Types.ObjectId;
}

export interface AddPetOutPut {
  _id: Types.ObjectId;
  name: string;
  breed: string;
  size: string;
  description: string;
}

export function parserBody(toPars: any) {
  if (!("name" in toPars)) {
    throw Error("Name doesn't exists in body");
  } else if (!("breed" in toPars)) {
    throw Error("Breed doesn't exists in body");
  } else if (!("description" in toPars)) {
    throw Error("Description doesn't exists in body");
  }
  return true;
}

export async function addPetWithBreedInteractor(pet: AddPetInput) {
  let breed = await breedRepository.getBreedById(pet.breed as Types.ObjectId);
  if (breed?._id) {
    let newPet = await petRepository.addPet({
      name: pet.name,
      breed: breed._id,
      size: breed.size,
      description: pet.description,
    });
    if (newPet._id) {
      let newPetOutput: AddPetOutPut = {
        _id: newPet._id,
        name: pet.name,
        breed: breed.breed,
        size: breed.size,
        description: pet.description,
      };
      return newPetOutput;
    } else {
      throw Error("Got error while creating pet.");
    }
  } else {
    throw Error("Got error while getting breed.");
  }
}

export async function addPetWithOutBreedInteractor(pet: AddPetInput) {
  let newBreed = await addBreedInteractor(
    pet.breed as string,
    pet.size as string,
    new Types.ObjectId(pet.animal)
  );
  if (newBreed._id) {
    let newPet = await petRepository.addPet({
      name: pet.name,
      breed: newBreed._id,
      size: newBreed.size,
      description: pet.description,
    });
    if (newPet._id) {
      let newPetOutput: AddPetOutPut = {
        _id: newPet._id,
        name: pet.name,
        breed: newBreed.breed,
        size: newBreed.size,
        description: pet.description,
      };
      return newPetOutput;
    } else {
      throw Error("Got error while creating pet.");
    }
  } else {
    throw Error("Got error while creating breed.");
  }
}
