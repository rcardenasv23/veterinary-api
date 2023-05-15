import mongoose, { Document, Types } from "mongoose";

export interface BreedInterface extends Document {
  animal: Types.ObjectId;
  breed: string;
  size: string;
}

const breedSchema = new mongoose.Schema({
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
    required: true,
  },
  breed: {
    type: "string",
    required: true,
  },
  size: {
    type: "string",
    required: true,
    enum: ["Muy Pequeño", "Pequeño", "Mediano", "Grande", "Muy Grande"],
  },
});

const breedModel = mongoose.model<BreedInterface>(
  "breeds",
  breedSchema,
  "breeds"
);

export default breedModel;
