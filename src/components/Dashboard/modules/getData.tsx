import { Command } from "@tauri-apps/api/shell";

export const getData = async (dataState: any, settings: any) => {
  const command = Command.sidecar("../test/dist/parse", settings.cerdPath);
  const output = await command.execute();
  console.log(output);
  if (output.stderr) {
    dataState([output.stderr]);
    return;
  }
  const stdout = output.stdout.split("\n");
  dataState(stdout);
};

export const getSheets = async (
  sheetState: any,
  settings: any,
  sheetName: string
) => {
  const command = Command.sidecar("../test/dist/getSheets", [
    settings.cerdPath,
    sheetName,
  ]);
  const output = await command.execute();
  if (output.stderr) {
    sheetState([output.stderr]);
    return;
  }
  const stdout = output.stdout.split("\n");
  sheetState(stdout);
};
