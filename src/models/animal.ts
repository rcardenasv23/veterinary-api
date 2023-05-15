import mongoose, { Document } from "mongoose";

export interface AnimalInterface extends Document {
  name: string;
}

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const animalModel = mongoose.model<AnimalInterface>(
  "animals",
  animalSchema,
  "animals"
);

export default animalModel;
