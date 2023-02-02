import { Command } from "@tauri-apps/api/shell";

export const fetchData = async (cerdPath: string) => {
  const command = Command.sidecar("../bundles/dist/getData", [cerdPath]);
  const stringData = await command.execute();
  if (stringData.stderr) return stringData.stderr;
  const data = JSON.parse(stringData.stdout);
  return data;
};
