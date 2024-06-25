import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { parcelsAsignedDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import "./parcelsAsigned.less";
import { useNavigate } from "react-router-dom";
import { parcelsAsignedMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { getParcelsAsigned } from "../../hooks/ApiActions/parcel";
import { Filters } from "./components/filters";
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";
import {
  IParcelsAsignedGroup,
  IParcelsAsignedGroupColumn,
} from "../../interfaces/parcels/IParcelsList";
import { parcelsAsignedMobileGroupColumns } from "./components/mobileGroup.columns";
import { useReceiveParcelDialog } from "./components/hooks/useReceiveParcelDialog";
import { NotificationInstance } from "antd/es/notification/interface";

export interface GetParcelsAsignedDto {
  authToken: IauthToken;
}

export const ParcelsAsigned = ({ api }: { api: NotificationInstance }) => {
  const breadcrumbItems = React.useMemo(
    () => [{ title: "Главная" }, { title: "Назначенные накладные" }],
    [],
  );

  const getReceiveParcelDialog = useReceiveParcelDialog(api);

  const { Content } = Layout;
  const token = authToken();
  const param: GetParcelsAsignedDto = {
    authToken: token,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(false));
      dispatch(setAppHeaderTitle("Назначенные накладные"));
    }
  }, []);

  const filters = useSelector(
    (state: IState) => state.settings.parcelsAsignedSettings.filters,
  );

  const parcelsData = useSelector(
    (state: IState) => state.pages.parcelsAsigned.data,
  );

  const dataSource = React.useMemo(() => {
    return parcelsData
      .map((el) => ({ ...el, key: el.id }))
      .filter((el) => {
        // Если есть фильтр по номеру то проверяем элемент, если не находим, то не возвращаем элемент
        if (filters.number) {
          const indexOf = el.number
            .toUpperCase()
            .indexOf(filters.number.toUpperCase());
          if (indexOf === -1) {
            return false;
          }
        }

        // Если накладная на доставку, то проверяем фильтр типа задачи и фильтр расчетной даты доставки
        if (el.toDelivery) {
          if (filters.taskType !== "toDelivery" && filters.taskType !== "all") {
            return false;
          }
          if (filters.date && Date.parse(el.planDate) !== filters.date) {
            return false;
          }
        }

        // Если накладная на забор, то проверяем фильтр типа задачи и фильтр даты накладной
        if (el.toReceive) {
          if (filters.taskType !== "toReceive" && filters.taskType !== "all") {
            return false;
          }
          if (filters.date && Date.parse(el.date) !== filters.date) {
            return false;
          }
        }

        // Если накладная получена, то проверяем фильтр типа задачи и фильтр даты накладной
        if (el.received) {
          if (filters.taskType !== "received" && filters.taskType !== "all") {
            return false;
          }
          if (filters.date && Date.parse(el.date) !== filters.date) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (a.received < b.received) {
          return -1;
        }
        if (a.received > b.received) {
          return 1;
        }
        return 0;
      });
  }, [parcelsData, filters]);

  const groups: IParcelsAsignedGroupColumn[] = React.useMemo(() => {
    const convertedList: IParcelsAsignedGroup[] = dataSource.map((el) => ({
      customer: el.customer,
      sendAddress: (el.toReceive || el.received) && el.sendAddress,
      sendCity: (el.toReceive || el.received) && el.sendCity,
      sendCompany: (el.toReceive || el.received) && el.sendCompany,
      sendTime: (el.toReceive || el.received) && el.sendTime,

      recAddress: el.toDelivery && el.recAddress,
      recCity: el.toDelivery && el.recCity,
      recCompany: el.toDelivery && el.recCompany,
      recTime: el.toDelivery && el.recTime,

      toDelivery: el.toDelivery,
      toReceive: el.toReceive,
      received: el.received,
    }));

    const convertedGroups: IParcelsAsignedGroupColumn[] = Array.from(
      new Set(convertedList.map((group) => JSON.stringify(group))),
    ).map((el, i) => {
      const group: IParcelsAsignedGroupColumn = JSON.parse(el);
      group.key = `${i}${group.customer}`;
      return group;
    });
    return convertedGroups;
  }, [dataSource]);

  const expandedRowRender = React.useCallback(
    (group: IParcelsAsignedGroupColumn) => {
      const data = dataSource.filter(
        (item) =>
          item.customer === group.customer &&
          item.toDelivery === group.toDelivery &&
          item.toReceive === group.toReceive &&
          (((item.toReceive || item.received) &&
            item.sendAddress === group.sendAddress) ||
            (item.toDelivery && item.recAddress === group.recAddress)) &&
          (((item.toReceive || item.received) &&
            item.sendCity === group.sendCity) ||
            (item.toDelivery && item.recCity === group.recCity)) &&
          (((item.toReceive || item.received) &&
            item.sendCompany === group.sendCompany) ||
            (item.toDelivery && item.recCompany === group.recCompany)),
      );

      return (
        <Table
          dataSource={data}
          columns={parcelsAsignedMobileColumns(
            getReceiveParcelDialog,
            navigate,
          )}
          showHeader={!isMobile()}
          loading={isLoading}
          pagination={false}
        />
      );
    },
    [dataSource],
  );

  const isLoading = useSelector(
    (state: IState) => state.pages.parcelsAsigned.loading,
  );

  React.useEffect(() => {
    if (!parcelsData.length) {
      getParcelsAsigned(dispatch, param);
    }
  }, []);

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
        }}
      >
        <Filters api={api} />
        {isMobile() ? (
          <Table
            dataSource={groups}
            columns={parcelsAsignedMobileGroupColumns()}
            expandable={{ expandedRowRender }}
            showHeader={!isMobile()}
            loading={isLoading}
            pagination={false}
          />
        ) : (
          <Table
            dataSource={dataSource}
            columns={parcelsAsignedDesktopColumns()}
            showHeader={!isMobile()}
            loading={isLoading}
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/parcels/${record.key}`);
                },
              };
            }}
          />
        )}
      </Content>
    </>
  );
};
