export interface Combination {
  equal: CalculatorComponentValue;
  floor: CalculatorComponentValue;
  ceil: CalculatorComponentValue;
}

export interface CalculatorComponentValue {
  value: number;
  cards: number[];
}
