import { s as sanitizeDecimalString } from './number-01151d2a.js';

const locales = [
  "ar",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-CH",
  "el",
  "en",
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "es-MX",
  "et",
  "fi",
  "fr",
  "fr-CH",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "it-CH",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "nb",
  "nl",
  "pl",
  "pt",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
];
function createLocaleNumberFormatter(locale) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20
  });
}
function delocalizeNumberString(numberString, locale) {
  if (numberString) {
    const groupSeparator = getGroupSeparator(locale);
    const decimalSeparator = getDecimalSeparator(locale);
    const splitNumberString = numberString.split("");
    const decimalIndex = splitNumberString.lastIndexOf(decimalSeparator);
    const delocalizedNumberString = splitNumberString
      .map((value, index) => {
      if (value === groupSeparator || (value === decimalSeparator && index !== decimalIndex)) {
        return "";
      }
      return value;
    })
      .reduce((string, part) => string + part)
      .replace(decimalSeparator, ".");
    return isNaN(Number(delocalizedNumberString)) ? numberString : delocalizedNumberString;
  }
  return numberString;
}
function getGroupSeparator(locale) {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567.8);
  const value = parts.find((part) => part.type === "group").value;
  return value.trim().length === 0 ? " " : value;
}
function getDecimalSeparator(locale) {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567.8);
  const value = parts.find((part) => part.type === "decimal").value;
  return value.trim().length === 0 ? " " : value;
}
function localizeNumberString(numberString, locale, displayGroupSeparator = false) {
  if (numberString) {
    const number = Number(sanitizeDecimalString(numberString));
    if (!isNaN(number)) {
      const formatter = createLocaleNumberFormatter(locale);
      const parts = formatter.formatToParts(number);
      const localizedNumberString = parts
        .map(({ type, value }) => {
        switch (type) {
          case "group":
            return displayGroupSeparator ? getGroupSeparator(locale) : "";
          case "decimal":
            return getDecimalSeparator(locale);
          default:
            return value;
        }
      })
        .reduce((string, part) => string + part);
      return localizedNumberString;
    }
  }
  return numberString;
}

export { localizeNumberString as a, delocalizeNumberString as d, getDecimalSeparator as g, locales as l };
