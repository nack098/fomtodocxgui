import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { getData, getSheets } from "./modules/getData";
import { getSettings } from "../Setting/modules/settings";
import "./Dashboard.css";

function Dashboard() {
  const [data, dataState] = useState([]);
  const [settings, settingState] = useState({});
  const [sheet, sheetState] = useState([]);

  useEffect(() => {
    const changeStateOnFirstLoad = async () => {
      const settingData = await getSettings();
      settingState(settingData);
      getData(dataState, settingData);
    };
    changeStateOnFirstLoad();
  }, []);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const innerHTML = e.currentTarget.innerHTML;
    console.log(innerHTML);
    getSheets(sheetState, settings, innerHTML);
  };

  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      {data.map((value) => (
        <div key={value}>
          <button key={value} onClick={onClickHandler}>
            {value}
          </button>
        </div>
      ))}
      {sheet.map((value) => (
        <div key={value}>
          <button key={value} onClick={onClickHandler}>
            {value}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
