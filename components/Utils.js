const formatTitleForUrl = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const getItemFromArray = (itemToFind, arrayToSearch) => {
  let slug = itemToFind.split("/").pop(); // Obtiene la última parte de la URL
  slug = slug.replace(/-/g, " "); // Convierte guiones a espacios
  return arrayToSearch.find(
    (x) => x.title.toLowerCase() === slug.toLowerCase()
  );
};

export { formatTitleForUrl, getItemFromArray };
