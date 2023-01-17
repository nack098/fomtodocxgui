import React, { useState, useEffect } from "react";
import { getPath, getSettings, saveSettings } from "./modules/settings";

function Setting() {
  const [cerdPath, cerdPathState] = useState("Loading");
  const [templatePath, templatePathState] = useState("Loading");
  const [outputPath, outputPathState] = useState("Loading");

  useEffect(() => {
    const getData = async () => {
      const data = await getSettings();
      cerdPathState(data["cerdPath"]);
      templatePathState(data["templatePath"]);
      outputPathState(data["outputPath"]);
    };
    getData();
  }, []);

  const clickHandler = async (e: any) => {
    e.preventDefault();
    const name = e.target.name || "";
    const path = await getPath(e.target.id, name);
    if (path !== null && path !== "") {
      switch (name) {
        case "cerdPath":
          cerdPathState(path as string);
          return;
        case "templatePath":
          templatePathState(path as string);
          return;
        case "outputPath":
          outputPathState(path as string);
          return;
      }
    }
  };

  const summitHandler = async () => {
    const currentSettings = {
      cerdPath: cerdPath,
      templatePath: templatePath,
      outputPath: outputPath,
    };
    saveSettings(JSON.stringify(currentSettings));
  };

  return (
    <>
      <h1>Settings</h1>
      <div>
        <p>{cerdPath}</p>
        <button onClick={clickHandler} name="cerdPath" id="false">
          Open CerdFile
        </button>
        <p>{templatePath}</p>
        <button onClick={clickHandler} name="templatePath" id="false">
          Open TemplateFile
        </button>
        <p>{outputPath}</p>
        <button onClick={clickHandler} name="outputPath" id="true">
          Open OutputFolder
        </button>
      </div>
      <button onClick={summitHandler} id="summit">
        Summit
      </button>
    </>
  );
}

export default Setting;
