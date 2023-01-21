import React, { useEffect, useState } from "react";
import { readTextFile } from "@tauri-apps/api/fs";
import { getSettings } from "../Setting/modules/settings";
import "./Dashboard.css";
import { getData } from "./modules/getData";

const defaultSettings: Settings = {
  cerdPath: "",
  outputPath: "",
  templatePath: "",
};

const DataIterator = (props: any) => {
  const data = props.data;
  const array: React.ReactElement[] = [];
  let count = 0;
  for (const sheet in data) {
    array.push(<h3 key={`${sheet}${count}`}>{sheet}</h3>);
    count += 1;
    let subcount = 0;
    for (const name in data[sheet]) {
      array.push(<p key={`${name}${subcount}`}>{name}</p>);
      subcount += 1;
    }
  }
  console.log(array);
  return <>{array}</>;
};

function Dashboard() {
  const [settings, settingsState] = useState(defaultSettings);
  const [key, keyState] = useState({});
  const [loading, loadingState] = useState(true);
  const [data, dataState] = useState({});

  const refresh = async () => {
    loadingState(true);
    const data = await getData(settings.cerdPath);
    dataState(data);
    loadingState(false);
  };

  useEffect(() => {
    const getCurrentSettings = async () => {
      const currentSettings = await getSettings();
      settingsState(currentSettings);
      const data = await getData(currentSettings.cerdPath);
      dataState(data);
      loadingState(false);
    };
    getCurrentSettings();
  }, []);

  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      <DataIterator data={data} />
    </div>
  );
}

export default Dashboard;
