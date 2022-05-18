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
  totalCost: number;
  sections: Record<string, section>;
};

export type section = {
  purchases: { itemName: string; amount: number }[];
  sectionCost: number;
};
