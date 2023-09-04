import * as React from "react";
import { ICost, IPrice } from "../../../interfaces/prices/IPrice";
import { delTypeEnum } from "../../../enumerations/delTypeEnum";

export const pricesColumns = (
  weight: number,
  temperatureModify: number,
  vatExtra: boolean,
  bonusModify: number,
  handleCreate: (delType: keyof typeof delTypeEnum) => void,
) => {
  return [
    {
      title: "Тип доставки",
      dataIndex: "delType",
      key: "delType",
    },

    {
      title: "Срок доставки",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "Стоимость",
      dataIndex: "cost",
      render: (text: string, record: IPrice) => {
        let total: number = 0;

        record.costs.forEach((cost: ICost) => {
          if (weight > cost.from && weight <= cost.to) {
            const ost = (weight - cost.from) / cost.extra;
            let roundOst = Math.round(ost);
            if (roundOst < ost) {
              roundOst++;
            }
            total = cost.summ + cost.extraSumm * roundOst;

            if (!!bonusModify) {
              total = total + (total * bonusModify) / 100;
            }

            if (vatExtra) {
              total = total * 1.2;
            }

            if (!!temperatureModify) {
              total = total * temperatureModify;
            }
          }
        });

        return Number(total.toFixed(2));
      },
    },
    {
      dataIndex: "operation",
      render: (text: string, record: IPrice) => (
        <a onClick={() => handleCreate(record.delType)}>Оформить накладную</a>
      ),
    },
  ];
};
