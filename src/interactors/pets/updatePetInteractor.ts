import { Types } from "mongoose";
import { addBreedInteractor } from "../breeds/addBreedsInteractor";
import { petRepository } from "../../repositories/petsRepository";

export interface UpdatePetInput {
  _id: Types.ObjectId;
  name: string;
  breed: Types.ObjectId;
  description: string;
  newBreedName?: string;
  size?: string;
  animal?: Types.ObjectId;
}

export function parserBody(toPars: any) {
  if (!("_id" in toPars)) {
    throw Error("_id doesn't exists in body");
  } else if (!("name" in toPars)) {
    throw Error("Name doesn't exists in body");
  } else if (!("breed" in toPars)) {
    throw Error("Breed doesn't exists in body");
  } else if (!("description" in toPars)) {
    throw Error("Description doesn't exists in body");
  }
  return true;
}

export async function updatePetInteractor(pet: UpdatePetInput) {
  if (pet.newBreedName) {
    let idOfAnimal;
    try {
      idOfAnimal = new Types.ObjectId(pet.animal);
    } catch (e) {
      throw Error("Error while parsing animal id");
    }
    let newBreed = await addBreedInteractor(
      pet.newBreedName,
      pet.size as string,
      idOfAnimal
    );
    if (newBreed._id) {
      pet.breed = newBreed._id;
      let updatedPet = await petRepository.updatePet(pet);
      return updatedPet;
    } else {
      throw Error("Error while creating new breed.");
    }
  } else {
    let updatedPet = await petRepository.updatePet(pet);
    return updatedPet;
  }
}
