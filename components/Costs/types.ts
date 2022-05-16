export type csvType = {
  amount: string;
  created: string;
  currency: string;
  item_name: string;
  menu_info: string;
  name: string;
  phone: string;
  quantity: string;
};

export type transformedCostData = {
  name: string;
  phone: string;
  costs: { sectionName: string; sectionCost: number }[];
  totalCost: number;
};
