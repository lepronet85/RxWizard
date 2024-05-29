export type Medication = {
  _id: string;
  name: string;
  description: string;
  usage: string;
  imageUrl: string;
  side_effects: string[];
  interactions: string[];
};
