const urlChecker = (url) => {
  const pattern = RegExp("^https://");
  return pattern.test(url);
};

export { urlChecker };
