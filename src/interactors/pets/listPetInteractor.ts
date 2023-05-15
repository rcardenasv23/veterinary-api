export interface ListPetInterface {
  _id: string;
  name: string;
  description: string;
  breed: {
    _id: string;
    breed: string;
    size: string;
  };
  animal: {
    _id: string;
    name: string;
  };
}
