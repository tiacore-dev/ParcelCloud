import { Form, InputNumber, Popconfirm } from "antd";
import * as React from "react";
import { IParcelItem } from "../../../interfaces/parcels/IParcel";
import { useDispatch } from "react-redux";
import { editPrices } from "../../../store/modules/pages/prices";
import { isMobile } from "../../../utils/isMobile";

export const columns = () => {
  const dispatch = useDispatch();

  const handleDelete = React.useCallback((index: number) => {
    dispatch(editPrices.deleteItem(index));
  }, []);

  const desktopColumns = [
    {
      title: "Вес (кг)",
      dataIndex: "weight",
      render: (text: string, record: IParcelItem, index: number) => (
        <InputNumber
          value={record?.weight || 0}
          bordered={false}
          min={0}
          precision={3}
          decimalSeparator=","
          onChange={(value) =>
            dispatch(editPrices.editItemWeight({ index, value }))
          }
        />
      ),
    },

    {
      title: "Высота (см)",
      dataIndex: "h",
      render: (text: string, record: IParcelItem, index: number) => (
        <InputNumber
          value={record?.h || 0}
          bordered={false}
          min={0}
          onChange={(value) => dispatch(editPrices.editItemH({ index, value }))}
        />
      ),
    },

    {
      title: "Длина (см)",
      dataIndex: "l",
      render: (text: string, record: IParcelItem, index: number) => (
        <InputNumber
          value={record?.l || 0}
          bordered={false}
          min={0}
          onChange={(value) => dispatch(editPrices.editItemL({ index, value }))}
        />
      ),
    },

    {
      title: "Ширина (см)",
      dataIndex: "w",
      render: (text: string, record: IParcelItem, index: number) => (
        <InputNumber
          value={record?.w || 0}
          bordered={false}
          min={0}
          onChange={(value) => dispatch(editPrices.editItemW({ index, value }))}
        />
      ),
    },

    {
      title: "Объемный вес (кг)",
      dataIndex: "volume",
      key: "volume",
    },

    {
      title: "Количество",
      dataIndex: "qt",
      render: (text: string, record: IParcelItem, index: number) => (
        <InputNumber
          value={record?.qt || 0}
          bordered={false}
          min={1}
          onChange={(value) =>
            dispatch(editPrices.editItemQt({ index, value }))
          }
        />
      ),
    },

    {
      title: "Итого вес (кг)",
      dataIndex: "tWeight",
      key: "tWeight",
    },

    {
      title: "Итого об. вес (кг)",
      dataIndex: "tVolume",
      key: "tVolume",
    },

    {
      dataIndex: "operation",
      render: (text: string, record: IParcelItem, index: number) => (
        <Popconfirm
          title="Действительно удалить?"
          onConfirm={() => handleDelete(index)}
          okText="Да"
          cancelText="Нет"
        >
          <a>Удалить</a>
        </Popconfirm>
      ),
    },
  ];
  const mobileColumns = [
    {
      dataIndex: "mobileData",
      render: (text: string, record: IParcelItem, index: number) => (
        <Form size="small" labelCol={{ span: 8 }} layout="horizontal">
          <Form.Item label="Вес" className="prices__items__form_item">
            <InputNumber
              className="prices__items__input_number"
              value={record?.weight || 0}
              min={0}
              precision={3}
              decimalSeparator=","
              onChange={(value) =>
                dispatch(editPrices.editItemWeight({ index, value }))
              }
            />
          </Form.Item>

          <Form.Item label="Высота (см)" className="prices__items__form_item">
            <InputNumber
              className="prices__items__input_number"
              value={record?.h || 0}
              min={0}
              onChange={(value) =>
                dispatch(editPrices.editItemH({ index, value }))
              }
            />
          </Form.Item>
          <Form.Item label="Длина (см)" className="prices__items__form_item">
            <InputNumber
              className="prices__items__input_number"
              value={record?.l || 0}
              min={0}
              onChange={(value) =>
                dispatch(editPrices.editItemL({ index, value }))
              }
            />
          </Form.Item>
          <Form.Item label="Ширина (см)" className="prices__items__form_item">
            <InputNumber
              className="prices__items__input_number"
              value={record?.w || 0}
              min={0}
              onChange={(value) =>
                dispatch(editPrices.editItemW({ index, value }))
              }
            />
          </Form.Item>

          <Form.Item label="Объемный вес" className="prices__items__form_item">
            {record.volume} кг
          </Form.Item>
          <Form.Item label="Количество" className="prices__items__form_item">
            <InputNumber
              className="prices__items__input_number"
              value={record?.qt || 0}
              min={1}
              onChange={(value) =>
                dispatch(editPrices.editItemQt({ index, value }))
              }
            />
          </Form.Item>
          <Form.Item label="Итого вес" className="prices__items__form_item">
            {record.tWeight} кг
          </Form.Item>
          <Form.Item label="Итого об. вес" className="prices__items__form_item">
            {record.tVolume} кг
          </Form.Item>
        </Form>
      ),
    },

    {
      dataIndex: "operation",
      render: (text: string, record: IParcelItem, index: number) => (
        <Popconfirm
          title="Действительно удалить?"
          onConfirm={() => handleDelete(index)}
          okText="Да"
          cancelText="Нет"
        >
          <a>Удалить</a>
        </Popconfirm>
      ),
    },
  ];
  return isMobile() ? mobileColumns : desktopColumns;
};
