import { Button, Card, Form, InputNumber, Popconfirm, Space } from "antd";
import * as React from "react";
import { IParcelItem } from "../../../interfaces/parcels/IParcel";
import { useDispatch } from "react-redux";
import { editParcelAction } from "../../../store/modules/editableEntities/editableParcel";
import { isMobile } from "../../../utils/isMobile";
import {
  CopyTwoTone,
  DeleteTwoTone,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export const columns = () => {
  const dispatch = useDispatch();

  const handleDelete = React.useCallback((index: number) => {
    dispatch(editParcelAction.deleteItem(index));
  }, []);

  const handleCopy = React.useCallback((index: number) => {
    dispatch(editParcelAction.copyItem(index));
  }, []);

  const columns = isMobile()
    ? [
        {
          key: "mobileData",
          render: (text: string, record: IParcelItem, index: number) => (
            <Card title={`Место №${index + 1}`}>
              <Form.Item
                label="Вес"
                className="create-parcel__items__form-item"
              >
                <InputNumber
                  className="create-parcel__items__input_number"
                  value={record?.weight || 0}
                  min={0}
                  precision={3}
                  decimalSeparator=","
                  onChange={(value) =>
                    dispatch(editParcelAction.editItemWeight({ index, value }))
                  }
                />
              </Form.Item>
              <Form.Item
                label="Высота (см)"
                className="create-parcel__items__form-item"
              >
                <InputNumber
                  className="create-parcel__items__input_number"
                  value={record?.h || 0}
                  min={0}
                  onChange={(value) =>
                    dispatch(editParcelAction.editItemH({ index, value }))
                  }
                />
              </Form.Item>
              <Form.Item
                label="Длина (см)"
                className="create-parcel__items__form-item"
              >
                <InputNumber
                  className="create-parcel__items__input_number"
                  value={record?.h || 0}
                  min={0}
                  onChange={(value) =>
                    dispatch(editParcelAction.editItemH({ index, value }))
                  }
                />
              </Form.Item>
              <Form.Item
                label="Ширина (см)"
                className="create-parcel__items__form-item"
              >
                <InputNumber
                  className="create-parcel__items__input_number"
                  value={record?.w || 0}
                  min={0}
                  onChange={(value) =>
                    dispatch(editParcelAction.editItemW({ index, value }))
                  }
                />
              </Form.Item>
              <Form.Item
                label="Объемный вес"
                className="create-parcel__items__form-item"
              >
                {record?.volume} кг
              </Form.Item>
              <Form.Item
                label="Количество"
                className="create-parcel__items__form-item"
              >
                <InputNumber
                  className="create-parcel__items__input_number"
                  value={record?.qt || 0}
                  min={1}
                  onChange={(value) =>
                    dispatch(editParcelAction.editItemQt({ index, value }))
                  }
                />
              </Form.Item>
              <Form.Item
                label="Итого вес"
                className="create-parcel__items__form-item"
              >
                {record?.tWeight} кг
              </Form.Item>
              <Form.Item
                label="Итого об. вес"
                className="create-parcel__items__form-item"
              >
                {record?.tVolume} кг
              </Form.Item>
              <Form.Item>
                <Popconfirm
                  title="Действительно удалить?"
                  onConfirm={() => handleDelete(index)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button danger>Удалить</Button>
                </Popconfirm>
              </Form.Item>
            </Card>
          ),
        },
      ]
    : [
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
                dispatch(editParcelAction.editItemWeight({ index, value }))
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
              onChange={(value) =>
                dispatch(editParcelAction.editItemH({ index, value }))
              }
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
              onChange={(value) =>
                dispatch(editParcelAction.editItemL({ index, value }))
              }
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
              onChange={(value) =>
                dispatch(editParcelAction.editItemW({ index, value }))
              }
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
            <>
              <InputNumber
                value={record?.qt || 0}
                bordered={false}
                min={1}
                onChange={(value) =>
                  dispatch(editParcelAction.editItemQt({ index, value }))
                }
              />
              <Space>
                <Button
                  disabled={!record || record.qt <= 1}
                  onClick={() => {
                    const value = (record?.qt || 0) - 1;
                    dispatch(editParcelAction.editItemQt({ index, value }));
                  }}
                  icon={<MinusCircleOutlined />}
                />
                <Button
                  onClick={() => {
                    const value = (record?.qt || 0) + 1;
                    dispatch(editParcelAction.editItemQt({ index, value }));
                  }}
                  icon={<PlusCircleOutlined />}
                />
              </Space>
            </>
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
            <Space>
              <Button
                icon={<CopyTwoTone twoToneColor="#ff1616" />}
                onClick={() => handleCopy(index)}
              />
              <Button
                icon={<DeleteTwoTone twoToneColor="#ff1616" />}
                onClick={() => handleDelete(index)}
              />
            </Space>
          ),
        },
      ];

  return columns;
};
