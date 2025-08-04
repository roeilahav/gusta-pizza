export interface IDrinkBase extends Document {
  name: string;
  image?: string;
  isAvailable: boolean;
  category: 'soft' | 'beer' | 'wine'; // discriminant
}
