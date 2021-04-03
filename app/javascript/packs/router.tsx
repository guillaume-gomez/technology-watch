import React, { ReactElement } from 'react';
import { useTranslation } from "react-i18next";

export default function Router() : ReactElement {
  const { t } = useTranslation();
  return (
  <div>
    <h2>{t("wave-hand")} 🚀</h2>
  </div>);
};