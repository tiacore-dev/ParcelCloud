import { Button, Table } from "antd";
import * as React from "react";
import { columns } from "./itemsTableCollumns";
import {
  IEditableParcelState,
  editParcelAction,
} from "../../../store/modules/editableEntities/editableParcel";
import { useDispatch } from "react-redux";
import { isMobile } from "../../../utils/isMobile";

export const ItemsTable = ({ data }: { data: IEditableParcelState }) => {
  const dispatch = useDispatch();

  const handleAddItem = React.useCallback(() => {
    dispatch(editParcelAction.addItem());
  }, []);

  return (
    <>
      <Table
        showHeader={!isMobile()}
        columns={columns()}
        rowClassName={() => "editable-row"}
        dataSource={data.items.map((item, index) => ({ ...item, key: index }))}
        bordered={!isMobile()}
        size="middle"
        pagination={false}
      />
      <Button
        onClick={handleAddItem}
        type="primary"
        style={{
          marginTop: 16,
        }}
      >
        Добавить место
      </Button>
    </>
  );
};
