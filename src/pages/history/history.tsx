import { Breadcrumb, Button, Input, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import * as React from "react";
import { minPageHeight } from "../../utils/pageSettings";
import { authToken } from "../../hooks/useAuth";
import { GetHistoryDto, getHistory } from "../../hooks/ApiActions/parcel";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { setParcelNumber } from "../../store/modules/pages/history";
import { History } from "../../components/history/history";
import { isMobile } from "../../utils/isMobile";

export const HistoryPage = () => {
  const parcelNumber = useSelector(
    (state: IState) => state.pages.history.parcelNumber
  );

  const historyData = useSelector((state: IState) => state.pages.history);
  const dispatch = useDispatch();

  const token = authToken();

  const handleChangeParcelNumber = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setParcelNumber(e.target.value));
    },
    []
  );

  const handleFind = React.useCallback((number: string) => {
    const params: GetHistoryDto = {
      authToken: token,
      parcelNumber: number,
    };
    getHistory(dispatch, params);
  }, []);

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        items={[
          { title: "Главная" },
          {
            title: "Отслеживание",
          },
        ]}
      />

      <Content
        style={{
          padding: "24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Space direction="vertical">
          <Input
            value={parcelNumber}
            onChange={handleChangeParcelNumber}
            style={{ width: "300px" }}
          />

          <Button onClick={() => handleFind(parcelNumber)}>Отследить</Button>
          {!!historyData.qt && `Количество мест: ${historyData.qt}`}
          {!!historyData.qt && `Фактический вес: ${historyData.weight}`}
          {!!historyData.qt && `Объемный вес: ${historyData.volume}`}
          {!!historyData.history.length && (
            <History historyData={historyData.history} />
          )}
        </Space>
      </Content>
    </>
  );
};
