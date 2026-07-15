export type BorderColor = "green" | "orange" | "purple" | "yellow" | null;

export interface Racer {
  id: string | null;
  name: string | null;
  ruleTitle: string | null;
  ruleDescription: string | null;
  image: string | null;
  credit: string | null;
  creditUrl: string | null;
  border1: BorderColor;
  border2: BorderColor;
}
