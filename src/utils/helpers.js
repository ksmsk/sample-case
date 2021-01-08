export const phoneMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
];

export const countries = ["TR", "US", "GB", "DE", "SE", "KE", "BR", "ZW"];

export const sanitizeNumeric = (str) => {
  return str.replace(/\D/g, "");
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
