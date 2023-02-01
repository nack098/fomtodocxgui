import React, { useMemo } from "react";
import { useTable } from "react-table";

const Table = (props: any) => {
  const data = useMemo(() => props.data, []);
  const columns = useMemo(() => {
    const array: object[] = [];
    for (const key of Object.keys(props.data[0])) {
      array.push({
        Header: key,
        accessor: key,
      });
    }
    return array;
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="mx-16 overflow-scroll mb-[15px]">
      <table
        {...getTableProps()}
        id="table"
        className="border-[2px] border-black"
      >
        <thead>
          {headerGroups.map((headerGroup: any, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: any, index) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, index) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell: any, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
