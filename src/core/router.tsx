import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";
import { Main } from "../pages/main/main";
import { CreateParcel } from "../pages/createParcel/createParcel";
import { Parcels } from "../pages/parcels/parcels";
import { Parcel } from "../pages/parcel/parcel";
import { Templates } from "../pages/templates/templates";
import { Template } from "../pages/template/template";
import { Prices } from "../pages/prices/prices";
import { Documents } from "../pages/documents/documents";
import { Document } from "../pages/document/document";
import { ParcelsAsigned } from "../pages/parcelsAsigned/parcelsAsigned";
import { Manifests } from "../pages/manifests/manifests";
import { Manifest } from "../pages/manifest/manifest";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Main />} />

          <Route path="auth" element={<Auth />} />

          <Route path="parcels">
            <Route index={true} element={<Parcels />} />
            <Route path="create" element={<CreateParcel />} />
            <Route path=":parcelId" element={<Parcel />} />
          </Route>

          <Route path="templates">
            <Route index={true} element={<Templates />} />
            <Route path=":templateId" element={<Template />} />
          </Route>

          <Route path="manifests">
            <Route index={true} element={<Manifests />} />
            <Route path=":manifestId" element={<Manifest />} />
          </Route>

          <Route path="documents">
            <Route index={true} element={<Documents />} />
            <Route path=":documentId" element={<Document />} />
          </Route>

          <Route path="tasks" element={<ParcelsAsigned />} />

          <Route path="prices" element={<Prices />} />
        </Route>
      </Routes>
    </>
  );
};
