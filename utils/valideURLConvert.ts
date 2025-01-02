export const valideURLConvert = (name:any) => {
  const url = name
    ?.toString()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-");
  return url;
};

export const reverseURLConvert = (url: any) => {
  const name = url
    ?.toString()
    .replaceAll("-", " ") // Revert hyphens to spaces
    .replace(/( )+/g, " ") // Remove extra spaces caused by consecutive hyphens
    .trim(); // Trim leading and trailing spaces
  return name;
};
