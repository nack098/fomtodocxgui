import React, { useState, useEffect } from "react";
import { getPath, fetchSettings, saveSettings } from "./modules/settings";

function Setting() {
  const [cerdPath, cerdPathState] = useState("Loading");
  const [templatePath, templatePathState] = useState("Loading");
  const [outputPath, outputPathState] = useState("Loading");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSettings();
      cerdPathState(data["cerdPath"]);
      templatePathState(data["templatePath"]);
      outputPathState(data["outputPath"]);
    };
    getData();
  }, []);

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name || "";
    const path = await getPath(e.currentTarget.id, name);
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
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div>
        <p>{cerdPath}</p>
        <button
          onClick={clickHandler}
          className="bg-[#86C8BC] px-[15px] rounded-[15px]"
          name="cerdPath"
          id="false"
        >
          Open CerdFile
        </button>
        <p>{templatePath}</p>
        <button
          onClick={clickHandler}
          className="bg-[#86C8BC] px-[15px] rounded-[15px]"
          name="templatePath"
          id="false"
        >
          Open TemplateFile
        </button>
        <p>{outputPath}</p>
        <button
          onClick={clickHandler}
          className="bg-[#86C8BC] px-[15px] rounded-[15px]"
          name="outputPath"
          id="true"
        >
          Open OutputFolder
        </button>
        <br />
        <button
          onClick={summitHandler}
          className="bg-[#86C8BC] px-[15px] rounded-[15px] mt-[15px]"
          id="summit"
        >
          Summit
        </button>
      </div>
    </div>
  );
}

export default Setting;
