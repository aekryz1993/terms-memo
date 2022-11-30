const findMany = (
  collection: any[],
  { label, value }: { label: string; value: string }
) => collection.filter((doc) => doc[label] === value);

const findById = (collection: any[], { id }: { id: string }) =>
  collection.find((doc) => doc.id === id);

export { findById, findMany };
