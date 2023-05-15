import animalModel from "../models/animal";

function listAnimals() {
  const animals = animalModel.find();
  return animals;
}

export const animalsRepository = Object.freeze({
  listAnimals,
});
