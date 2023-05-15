export interface FilterInputInterface {
  animals: string[];
  breeds: string[];
}

export function parserBodyFilter(body: any) {
  if (!("animals" || "animal" in body)) {
    throw Error("No animals");
  } else if (!("breeds" || "breed" in body)) {
    throw Error("No breeds");
  }
  return {
    animals: body.animals || body.animal,
    breeds: body.breeds || body.breed,
  };
}
