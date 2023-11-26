import * as React from "react";
import { ICost, IPrice } from "../../../interfaces/prices/IPrice";
import { delTypeEnum } from "../../../enumerations/delTypeEnum";
import { ColumnsType } from "antd/es/table";

export const pricesColumns = (
  weight: number,
  temperatureModify: number,
  vatExtra: boolean,
  bonusModify: number,
  insureValue: number,
  handleCreate: (delType: keyof typeof delTypeEnum) => void,
): ColumnsType<IPrice> => {
  const collumns: ColumnsType<IPrice> = [
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
      title: "Стоимость доставки",
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
  ];

  if (!!insureValue) {
    collumns.push({
      title: "Стоимость страховки",
      key: "time",
      render: () => insureValue * 0.03,
    });
  }

  collumns.push({
    dataIndex: "operation",
    render: (text: string, record: IPrice) => (
      <a onClick={() => handleCreate(record.delType)}>Оформить накладную</a>
    ),
  });

  return collumns;
};
