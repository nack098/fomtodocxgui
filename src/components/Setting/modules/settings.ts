import {
  BaseDirectory,
  writeTextFile,
  createDir,
  readTextFile,
} from "@tauri-apps/api/fs";

import { open } from "@tauri-apps/api/dialog";

export const saveSettings = async (userSettings: string) => {
  try {
    await writeTextFile("config.json", userSettings, {
      dir: BaseDirectory.AppConfig,
    });
    console.log("Success");
  } catch (err) {
    if (
      err ===
      "path: /home/nack/.config/com.tauri.dev/config.json: No such file or directory (os error 2)"
    ) {
      await createDir("formtodocx", {
        dir: BaseDirectory.AppConfig,
        recursive: true,
      });
      saveSettings(userSettings);
    }
  }
};

export const getSettings = async () => {
  try {
    const file = await readTextFile("config.json", {
      dir: BaseDirectory.AppConfig,
    });
    const config = await JSON.parse(file);
    return config;
  } catch (err) {
    const defaultOption = {
      cerdPath: "No data please insert",
      templatePath: "No data please insert",
      outputPath: "No data please insert",
    };
    await saveSettings(JSON.stringify(defaultOption));
    return defaultOption;
  }
};

export const getPath = async (directory: string, title: string) => {
  try {
    const path =
      directory === "true"
        ? open({ multiple: false, title: title, directory: true })
        : open({ multiple: false, title: title, directory: false });
    if (path) {
      return path;
    } else {
      return "";
    }
  } catch (err) {
    console.log(err);
  }
};
