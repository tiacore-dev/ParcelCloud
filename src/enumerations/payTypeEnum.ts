export type payTypeKeys =
  | "ОплатаНаличнымиПриОтправлении"
  | "ОплатаНаличнымиПриПолучении"
  | "БезналичнаяОплата";

export type payTypeValues =
  | "Оплата наличными при отправлении"
  | "Оплата наличными при получении"
  | "Безналичная оплата";

export const payTypeEnum: Record<payTypeKeys, payTypeValues> = {
  ОплатаНаличнымиПриОтправлении: "Оплата наличными при отправлении",
  ОплатаНаличнымиПриПолучении: "Оплата наличными при получении",
  БезналичнаяОплата: "Безналичная оплата",
};

export const PayTypeSelectOptions = Object.keys(payTypeEnum).map(
  (el: keyof typeof payTypeEnum) => ({
    value: el,
    label: payTypeEnum[el],
  }),
);
