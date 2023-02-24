export const numberOfLinesDeleted = (data: any) => {
  const result = data.map((el: any) => {
    return el.deletions;
  });

  return result;
};
