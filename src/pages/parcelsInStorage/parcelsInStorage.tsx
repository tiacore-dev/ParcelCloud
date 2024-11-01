import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { parcelsInStorageDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import "./parcelsInStorage.less";
import { useNavigate } from "react-router-dom";
import { parcelsInStorageMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { getParcelsInStorage } from "../../hooks/ApiActions/parcel";
import { Filters } from "./components/filters";
import { TableRowSelection } from "antd/es/table/interface";
import {
  IParcelsInStorageListColumn,
  IParcelsList,
} from "../../interfaces/parcels/IParcelsList";
import { NotificationInstance } from "antd/es/notification/interface";

export interface GetParcelsInStorageDto {
  authToken: IauthToken;
}

export const ParcelsInStorage = ({ api }: { api: NotificationInstance }) => {
  const breadcrumbItems = React.useMemo(
    () => [{ title: "Главная" }, { title: "Накладные на складе" }],
    []
  );

  const { Content } = Layout;
  const token = authToken();
  const param: GetParcelsInStorageDto = {
    authToken: token,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState<IParcelsList[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const filters = useSelector(
    (state: IState) => state.settings.parcelsInStorageSettings?.filters
  );

  const parcelsData = useSelector(
    (state: IState) => state.pages.parcelsInStorage.data
  );

  const isLoading = useSelector(
    (state: IState) => state.pages.parcelsInStorage.loading
  );

  const dataSource: IParcelsInStorageListColumn[] = React.useMemo(
    () =>
      parcelsData
        .map((el) => ({ ...el, key: el.id }))
        .filter(
          (el) =>
            (filters.number === "" ||
              el.number.toUpperCase().indexOf(filters.number.toUpperCase()) >
                -1) &&
            (filters?.parcelInStorageType === "all" ||
              (filters?.parcelInStorageType === "toDelivery" &&
                el.toDelivery) ||
              (filters?.parcelInStorageType === "myOwn" && el.myOwn) ||
              (filters?.parcelInStorageType === "toReceive" && el.toReceive))
        ),
    [parcelsData, filters.parcelInStorageType, filters.number]
  );

  React.useEffect(() => {
    if (!parcelsData.length) {
      getParcelsInStorage(dispatch, param);
    }
  }, []);

  const rowSelection: TableRowSelection<IParcelsInStorageListColumn> = {
    selectedRowKeys,
    type: "checkbox",
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: IParcelsInStorageListColumn[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const addRow = (row: IParcelsInStorageListColumn) => {
    setSelectedRows([...selectedRows, row]);
  };

  const addRowKey = (key: string) => {
    setSelectedRowKeys([...selectedRowKeys, key]);
  };

  const selectRow = React.useCallback(
    (parcelNumber: string) => {
      const newRow = dataSource.find(
        (parcel) => parcel.number === parcelNumber.toString()
      );

      if (newRow) {
        if (selectedRowKeys.includes(newRow.id)) {
          api.warning({
            message: `Накладная ${parcelNumber} уже добавлена в манифест`,
            placement: "bottomRight",
          });
        } else {
          api.success({
            message: `Накладная ${parcelNumber} добавлена в манифест`,
            placement: "bottomRight",
          });
          addRowKey(newRow.id);
          addRow(newRow);
        }
      } else {
        api.error({
          message: `Накладная ${parcelNumber} не найдена на складе`,
          placement: "bottomRight",
        });
      }
    },
    [addRow, addRowKey, dataSource, selectedRows, selectedRowKeys]
  );

  return (
    <>
      <Breadcrumb
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        className="breadcrumb"
        items={breadcrumbItems}
      />
      <Content
        style={{
          padding: isMobile() ? 0 : 8,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Filters selectedRows={selectedRows} selectRow={selectRow} />
        <Table
          dataSource={dataSource}
          columns={
            isMobile()
              ? parcelsInStorageMobileColumns()
              : parcelsInStorageDesktopColumns(navigate)
          }
          loading={isLoading}
          rowSelection={rowSelection}
          pagination={false}
        />
      </Content>
    </>
  );
};
