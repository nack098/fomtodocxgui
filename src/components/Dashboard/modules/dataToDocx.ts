import { Command } from "@tauri-apps/api/shell";

export const dataToDocx = async (
  templatePath: string,
  content: object,
  outputPath: string,
  name: string
) => {
  const command = Command.sidecar("../bundles/dist/toDocx", [
    templatePath,
    JSON.stringify(content),
    outputPath,
    name.replaceAll("/", ".").replaceAll(":", ".").replaceAll(" ", "."),
  ]);
  const output = await command.execute();
  console.log(output);
};
