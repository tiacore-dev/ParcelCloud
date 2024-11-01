import * as React from "react";
import { notification, Button } from "antd";
import { DeleteTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { authToken } from "../../../hooks/useAuth";
import {
  GetManifestDto,
  deleteManifest,
  sendManifest,
} from "../../../hooks/ApiActions/manifest";
import { IManifest } from "../../../interfaces/manifests/IManifest";
import { useNavigate } from "react-router-dom";
import { exportHeaderManifestParcels } from "./header.export";
import { DownloadButton } from "../../../components/downloadButton";
import dayjs from "dayjs";
import { dateFormat } from "../../../utils/dateConverter";

interface IManifestActionsProps {
  manifestData: IManifest;
}

export const ManifestActions = (props: IManifestActionsProps) => {
  const { manifestData } = props;

  const [api, contextHolder] = notification.useNotification();
  const token = authToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onError = async () => {
    api.error({
      message: `Ошибка`,
      description: "Что-то пошло не так",
      placement: "bottomRight",
    });
  };

  const sentManifestParams: GetManifestDto = {
    authToken: token,
    manifestId: manifestData.id,
  };

  const sentManifestHandler = () => {
    sendManifest(dispatch, sentManifestParams, onError);
  };

  const deleteManifestHandler = () => {
    deleteManifest(dispatch, navigate, sentManifestParams, onError);
  };

  const downloadingData = React.useMemo(
    () =>
      manifestData.parcels.map((el) => ({
        ...el,
        weight: el.weight.toLocaleString("ru"),
        volume: el.volume.toLocaleString("ru"),
        date: dayjs(el.date).format(dateFormat),
      })),
    [manifestData],
  );

  return (
    <div className="manifest__actions">
      {manifestData.type === "outgoing" && !manifestData.sent && (
        <Button
          size="large"
          type="primary"
          className="manifest__actions__button"
          icon={<PlusCircleTwoTone twoToneColor="#ff1616" />}
          onClick={sentManifestHandler}
        >
          Отправить манифест
        </Button>
      )}

      {manifestData.type === "outgoing" && !manifestData.sent && (
        <Button
          size="large"
          className="manifest__actions__button"
          icon={<DeleteTwoTone twoToneColor="#ff1616" />}
          onClick={deleteManifestHandler}
        />
      )}

      <DownloadButton
        className=""
        data={downloadingData}
        headers={exportHeaderManifestParcels}
        filename={`Манифест ${manifestData.number} СВС-Логистик`}
      />
      {contextHolder}
    </div>
  );
};
