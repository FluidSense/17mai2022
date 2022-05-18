import { csvType, section, transformedCostData } from "./types";

export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

export const transformParseResult = (
  data: csvType[]
): transformedCostData[] => {
  const dataWithParsedMenuInfo = data
    .filter((d) => d.menu_info.length)
    .filter((d) => d.phone)
    .map((line) => {
      return {
        ...line,
        menu_info: JSON.parse(line.menu_info),
      };
    });

  const dataWithOutCountryCode = dataWithParsedMenuInfo.map((line) => ({
    ...line,
    phone: line.phone.slice(-8),
  }));

  const groupedByPhone = groupBy(dataWithOutCountryCode, (i) => i.phone);

  const transformed = Object.keys(groupedByPhone).map((number) => {
    const dataForNumber = groupedByPhone[number];

    const groupedBySection = groupBy(
      dataForNumber,
      (i) => i.menu_info.sectionName as string
    );

    const sections: Record<string, section> = {};

    Object.keys(groupedBySection).map((sectionName) => {
      const ordersForSection = groupedBySection[sectionName];

      const purchases = ordersForSection.map((o) => ({
        itemName: o.item_name,
        amount: Number(o.amount),
      }));

      const costForSection = ordersForSection.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
      );

      const section: section = {
        purchases: purchases,
        sectionCost: costForSection,
      };

      sections[sectionName] = section;
    });

    const costsPerSection = Object.keys(sections).map(
      (sectionName) => sections[sectionName].sectionCost
    );

    const totalCostForNumber = costsPerSection.reduce(
      (acc, curr) => acc + curr,
      0
    );

    const transformed: transformedCostData = {
      name: dataForNumber[0].name,
      phone: number,
      sections: sections,
      totalCost: totalCostForNumber,
    };

    return transformed;
  });

  return transformed;
};
