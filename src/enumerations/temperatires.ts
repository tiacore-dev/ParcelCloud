export const temperatureEnum = {
  "00": "Отсутствует",
  "-15-20": "-15 -20",
  "28": "+2 +8",
  "1525": "+15 +25",
};

export const temperatureValues: Record<string, { min: number; max: number }> = {
  "00": {
    min: 0,
    max: 0,
  },
  "-15-20": {
    min: -15,
    max: -20,
  },
  "28": {
    min: 2,
    max: 8,
  },
  "1525": {
    min: 15,
    max: 25,
  },
};

export const temperatureKeys = ["00", "-15-20", "28", "1525"];

export const temperatureSelectOptions = temperatureKeys.map(
  (el: keyof typeof temperatureEnum) => ({
    value: el,
    label: temperatureEnum[el],
  }),
);
