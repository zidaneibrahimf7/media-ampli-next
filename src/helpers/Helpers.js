export const camelCaseToText = (text) => {
  const result = text.replace(/([A-Z])/g, " $1").trim();
  const capitalized = result
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  return capitalized;
};

export const firstCase = (str) => {
  var splitStr = str?.toLowerCase().split(' ');
  for (var i = 0; i < splitStr?.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr?.join(' ');
};