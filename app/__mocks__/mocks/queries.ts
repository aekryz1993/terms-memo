const findMany = (
  collection: any[],
  { label, value }: { label: string; value: string }
) => collection.filter((doc) => doc[label] === value);

const findById = (collection: any[], { id }: { id: string }) =>
  collection.find((doc) => doc.id === id);

const filterItems = (
  items: any[],
  { skip, take, search }: { skip: number; take: number; search?: string },
  { searchField }: { searchField?: "title" | "name" }
) => {
  if (items.length === 0)
    return {
      items,
      tatolItems: 0,
      totalPages: 0,
      currentPage: 1,
    };

  const sortedItemsByDate = items.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  const searchedItems =
    search && searchField
      ? sortedItemsByDate.filter((item) =>
          item[searchField].toLowerCase().includes(search.toLowerCase())
        )
      : sortedItemsByDate;

  const fetchedItems = searchedItems.slice(skip).slice(0, take);
  return {
    items: fetchedItems,
    tatolItems: searchedItems.length,
    totalPages: Math.ceil(searchedItems.length / take),
    currentPage: skip / take + 1,
  };
};

export { findById, findMany, filterItems };
