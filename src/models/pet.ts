import mongoose, { Document, Types } from "mongoose";

export interface PetInterface extends Document {
  breed: Types.ObjectId;
  name: string;
  description: string;
}

const petSchema = new mongoose.Schema({
  breed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "breeds",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
});

const petModel = mongoose.model<PetInterface>("pets", petSchema, "pets");

export default petModel;
