import React, { useState, useEffect } from "react";
import { getSettings } from "../modules/settings";

const SettingsTemplate = (props: any) => {
  const [path, pathState] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getSettings();
      pathState(data[props.name]);
    };
    getData();
  }, []);

  return <>{path}</>;
};

export default SettingsTemplate;
