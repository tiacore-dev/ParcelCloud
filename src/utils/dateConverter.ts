export const dateFormat = "DD.MM.YYYY";
export const dateTimeFormat = "DD.MM.YYYY HH:mm";

export const dateToLocalString = (string: string) => {
  const timestamp = Date.parse(string);
  if (timestamp > 0) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ru");
  }
};
