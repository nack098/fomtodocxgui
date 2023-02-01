import React, { useMemo } from "react";
import Table from "./Table";

const Data = (props: any) => {
  try {
    const data = {};
    const render: React.ReactElement[] = [];

    props.data.forEach((element) => {
      if (element["sheet"] in data) {
        if (element["worksheet"] in data[element["sheet"]]) {
          data[element["sheet"]][element["worksheet"]].push(element);
        } else {
          data[element["sheet"]][element["worksheet"]] = [element];
        }
      } else {
        data[element["sheet"]] = {};
        data[element["sheet"]][element["worksheet"]] = [element];
      }
    });

    let index1 = 0;
    for (const key of Object.keys(data)) {
      render.push(
        <h3 className="text-2xl underline font-bold" key={index1}>
          {key}
        </h3>
      );
      let index2 = 0;
      for (const sheet of Object.keys(data[key])) {
        const downloaded: object[] = [];
        const unload: object[] = [];
        const unknown: object[] = [];
        for (const value of data[key][sheet]) {
          switch (value["Status"]) {
            case "Downloaded":
              downloaded.push(value);
              break;
            case "":
              unload.push(value);
              break;
            default:
              unknown.push(value);
              break;
          }
        }
        render.push(
          <h4 className="text-xl font-bold" key={`${index1}:${index2}`}>
            {sheet}
          </h4>
        );
        if (downloaded.length != 0) {
          render.push(
            <>
              <h4
                className="text-xs font-bold"
                key={`${index1}:${index2}:Downloaded`}
              >
                Downloaded
              </h4>
              <Table
                data={downloaded}
                id="table"
                key={`${index1}:${index2}:Downloaded`}
              />
            </>
          );
        }
        if (unload.length != 0) {
          render.push(
            <>
              <h4
                className="text-xs font-bold"
                key={`${index1}:${index2}:NotDownload`}
              >
                Not Download
              </h4>
              <Table
                data={unload}
                id="table"
                key={`${index1}:${index2}:NotDownload`}
              />
            </>
          );
        }
        if (unknown.length != 0) {
          render.push(
            <>
              <h4
                className="text-xs font-bold"
                key={`${index1}:${index2}:Unknown`}
              >
                Unknown
              </h4>
              <Table
                data={unknown}
                id="table"
                key={`${index1}:${index2}:Unknown`}
              />
            </>
          );
        }
        index2 += 1;
      }
      index1 += 1;
    }

    return <div>{render}</div>;
  } catch (error) {
    return <p>{JSON.stringify(error, Object.getOwnPropertyNames(error))}</p>;
  }
};

export default Data;
