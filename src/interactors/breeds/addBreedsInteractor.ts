import { Types } from "mongoose";
import { breedRepository } from "../../repositories/breedsRepository";

export interface AddBreedInput {
  breed: string;
  size: string;
  animal: Types.ObjectId;
}

export async function addBreedInteractor(
  breed: string,
  size: string,
  animal: Types.ObjectId
) {
  let newBreed = await breedRepository.addBreed({
    breed: breed as string,
    size: size as string,
    animal: animal!,
  });

  return newBreed;
}
