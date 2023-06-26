export const payTypeEnum = {
    "ОплатаНаличнымиПриОтправлении": "Оплата наличными при отправлении",
    "ОплатаНаличнымиПриПолучении":  "Оплата наличными при получении",
    "БезналичнаяОплата": "Безналичная оплата"
}

export const PayTypeSelectOptions = Object.keys(payTypeEnum).map((el: keyof typeof payTypeEnum) => ({
    value: el,
    label: payTypeEnum[el]
}))