import * as React from "react";

interface ICalltoProps {
  phone: string;
  altText?: string;
}

export const Callto = (props: ICalltoProps) => {
  const { phone, altText } = props;
  return <a href={`tel:${phone}`}>{altText ?? phone}</a>;
};
