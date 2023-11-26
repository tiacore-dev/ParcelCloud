import * as React from "react";
import { Layout, Menu, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useNavigate } from "react-router-dom";
import { checkPermission } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { clearCreateParcelState } from "../../store/modules/editableEntities/editableParcel";
import logo from "./logo.png";
import { clearHistoryState } from "../../store/modules/pages/history";
import { IState } from "../../store/modules";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const AppHeader = React.memo(({ isMobile }: { isMobile: boolean }) => {
  const desktopItems: ItemType[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Title } = Typography;
  const showBackButton = useSelector(
    (state: IState) => state.settings.generalSettings?.showBackButton,
  );
  const back = () => {
    navigate(-1);
  };
  const appHeaderTitle = useSelector(
    (state: IState) => state.settings.generalSettings?.appHeaderTitle,
  );
  const parcelsLabel = checkPermission("parcel-view-in-work")
    ? "Накладные"
    : "Мои Накладные";

  if (checkPermission("parcel-view-in-work")) {
    desktopItems.push({
      key: "tasks",
      label: "Мои задачи",
      onClick: () => {
        navigate("/tasks");
      },
    });
  }

  desktopItems.push({
    key: "parcels",
    label: parcelsLabel,
    onClick: () => {
      navigate("/parcels");
    },
  });

  desktopItems.push({
    key: "create",
    label: "Создать",
    onClick: () => {
      dispatch(clearCreateParcelState());
      navigate("/parcels/create");
    },
  });

  if (checkPermission("parcel-view-in-work")) {
    desktopItems.push({
      key: "storage",
      label: "Склад",
      onClick: () => {
        navigate("/storage");
      },
    });
  }

  desktopItems.push({
    key: "history",
    label: "Отслеживание",
    onClick: () => {
      dispatch(clearHistoryState());
      navigate("/history");
    },
  });

  if (checkPermission("template-view")) {
    desktopItems.push({
      key: "templates",
      label: "Шаблоны",
      onClick: () => {
        navigate("/templates");
      },
    });
  }

  if (
    checkPermission("manifest-incoming-view") ||
    checkPermission("manifest-outgoing-view")
  ) {
    desktopItems.push({
      key: "manifests",
      label: "Манифесты",
      onClick: () => {
        navigate("/manifests");
      },
    });
  }

  if (checkPermission("price-view")) {
    desktopItems.push({
      key: "prices",
      label: "Расчет тарифа",
      onClick: () => {
        navigate("/prices");
      },
    });
  }

  if (checkPermission("document-view")) {
    desktopItems.push({
      key: "documents",
      label: "Документы",
      onClick: () => {
        navigate("/documents");
      },
    });
  }

  desktopItems.push({
    key: "auth",
    label: "Аккаунт",
    onClick: () => {
      navigate("/auth");
    },
  });

  // const mobileItems: ItemType[] = [
  //   {
  //     key: "parcelsApp",
  //     label: "Накладные",
  //     onClick: () => {
  //       navigate("/parcels");
  //     },
  //   },
  //   {
  //     key: "createParcel",
  //     label: "Создать",
  //     onClick: () => {
  //       navigate("/parcels/create");
  //     },
  //   },
  //   {
  //     key: "templates",
  //     label: "Шаблоны",
  //     onClick: () => {
  //       navigate("/templates");
  //     },
  //   },
  //   {
  //     key: "prices",
  //     label: "Расчет тарифа",
  //     onClick: () => {
  //       navigate("/prices");
  //     },
  //   },
  //   {
  //     key: "documents",
  //     label: "Документы",
  //     onClick: () => {
  //       navigate("/documents");
  //     },
  //   },
  //   {
  //     key: "auth",
  //     label: "Аккаунт",
  //     onClick: () => {
  //       navigate("/auth");
  //     },
  //   },
  // ];

  return isMobile ? (
    <Header className={"header"} style={{ backgroundColor: "white" }}>
      {showBackButton && (
        <ArrowLeftOutlined
          onClick={back}
          style={{ margin: "auto 12px  auto -24px", fontSize: "24px" }}
        />
      )}
      <Title level={3} style={{ margin: "auto 0" }}>
        {appHeaderTitle}
      </Title>
    </Header>
  ) : (
    <Header className={"header"} style={{ backgroundColor: "white" }}>
      <img className="header__logo" src={logo} />
      <Menu
        className={"header__menu"}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={desktopItems}
      />
    </Header>
  );
});
