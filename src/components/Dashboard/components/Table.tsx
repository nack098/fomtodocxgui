// @ts-nocheck

import React, {
  useMemo,
  useEffect,
  MouseEventHandler,
  MouseEvent,
} from "react";
import { useTable, useRowSelect } from "react-table";
import { dataToDocx } from "../modules/dataToDocx";

interface IndeterminateInputProps {
  indeterminate?: any;
  name: string;
}

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  IndeterminateInputProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>();
  const resolvedRef = (ref ||
    defaultRef) as React.MutableRefObject<HTMLInputElement>;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      // Let's make a column for selection
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  });

  const submit = (e: MouseEvent) => {
    e.preventDefault();
    const send = selectedFlatRows.map((e) => e.original);
    for (const value of send) {
      dataToDocx(
        props.settings.templatePath,
        value,
        props.settings.outputPath,
        value["Timestamp"]
      );
    }
  };

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
      <button
        onClick={submit}
        className="mt-[15px] w-auto h-auto ml-[15px] bg-[#86C8BC] px-[15px] rounded-[15px] hover:bg-[#ceedc7] duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default Table;
