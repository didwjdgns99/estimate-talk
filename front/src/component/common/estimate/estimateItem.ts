export type EstimateItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
};

export const createEmptyItem = (): EstimateItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 0,
  unitPrice: 0,
  discountRate: 0,
});

export type TaxTypeValue = "taxable" | "taxFree";
