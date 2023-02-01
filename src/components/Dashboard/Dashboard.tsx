import React, { useEffect, useState } from "react";
import { fetchSettings } from "../Setting/modules/settings";
import { Data } from "./components";
import "./Dashboard.css";
import { fetchData } from "./modules/fetchData";

const Dashboard = () => {
  const [loading, loadingState] = useState(true);
  const [settings, settingsState] = useState(Object);
  const [data, dataState] = useState(Object);
  const [select, selectState] = useState<any[]>([]);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await fetchSettings();
      settingsState(settings);
      return settings;
    };
    const getData = async () => {
      const settings = await getSettings();
      const data = await fetchData(settings.cerdPath);
      dataState(data);
      loadingState(false);
    };
    getData();
  }, []);

  const refresh = async () => {
    try {
      loadingState(true);
      const newData = await fetchData(settings.cerdPath);
      dataState(newData);
      loadingState(false);
    } catch (e) {
      loadingState(true);
    }
  };

  return (
    <div id="dashboard">
      <div>
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <div className="flex flex-col m-0">
          <div>
            <button
              onClick={refresh}
              className="w-auto h-auto ml-[15px] bg-[#86C8BC] px-[15px] border-black border-[2px] rounded-[15px] hover:bg-[#ceedc7] duration-200"
            >
              Refresh
            </button>
          </div>
          {!loading == true ? (
            <Data data={data} select={select} selectState={selectState} />
          ) : (
            <p className="font-bold underline text-xl">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
