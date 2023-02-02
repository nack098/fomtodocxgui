interface Settings {
  cerdPath: string;
  outputPath: string;
  templatePath: string;
}

interface Data {
  sheetName: string;
  modifiedTime: string;
  worksheetName: string;
  data: unkown[];
}

declare namespace React {
  export default interface RefObject<T> {
    current: T | null;
  }
}
