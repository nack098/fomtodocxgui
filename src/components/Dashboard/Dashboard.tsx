import React, { useEffect, useState } from "react";
import { Command } from "@tauri-apps/api/shell";
import "./Dashboard.css";
import { getSettings } from "../Setting/modules/settings";

const getData = async (dataState: any, settings: any) => {
  const command = Command.sidecar("../test/dist/parse", settings.cerdPath);
  const output = await command.execute();
  console.log(output);
  const stdout = output.stdout;
  let stdoutArray = stdout.slice(3, -3).replace(/'/g, "").split(", ");
  stdoutArray = stdoutArray.map((data) =>
    decodeURI(data.replace(/\\x/g, "%").replace(/\\/g, "%"))
  );
  dataState(stdoutArray);
};

function Dashboard() {
  const [data, dataState] = useState([]);
  const [settings, settingState] = useState({});

  useEffect(() => {
    const changeStateOnFirstLoad = async () => {
      const settingData = await getSettings();
      settingState(settingData);
      getData(dataState, settingData);
    };
    changeStateOnFirstLoad();
  }, []);

  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      {data.map((value) => (
        <p key={value}>{value}</p>
      ))}
    </div>
  );
}

export default Dashboard;
