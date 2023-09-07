export const delTypeEnum = {
  Забор: "Забор",
  СуперЭкспресс: "Супер Экспресс",
  ЭкономНаземныйТранспорт: "Эконом (Наземный транспорт)",
};

export const delTypeSelectOptions = Object.keys(delTypeEnum).map(
  (el: keyof typeof delTypeEnum) => ({
    value: el,
    label: delTypeEnum[el],
  }),
);
