import { Types } from "mongoose";
import breedModel from "../models/breed";
import { AddBreedInput } from "../interactors/breeds/addBreedsInteractor";

async function listBreeds() {
  const breeds = await breedModel.find();
  return breeds;
}

async function listSizes() {
  const breeds = await breedModel.distinct("size");
  return breeds;
}

async function getBreedById(id: Types.ObjectId) {
  const breed = await breedModel.findById(id);
  return breed;
}

async function addBreed(breed: AddBreedInput) {
  const newBreed = await breedModel.create(breed);
  return newBreed;
}

export const breedRepository = Object.freeze({
  getBreedById,
  addBreed,
  listSizes,
  listBreeds,
});
