export const getString = (data) => {
  if (!data || (typeof data !== "string" && typeof data !== "number"))
    return "_";
  else return data;
};
