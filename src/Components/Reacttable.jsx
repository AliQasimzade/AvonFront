import React from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

const ReactTable = ({ columns, data } ) => {
    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow, } = useTable({ columns, data });

    return (
        <React.Fragment>
            <Table {...getTableProps()}>
                <thead>
                    {
                        headerGroups?.map((headerGroup ) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup?.headers?.map((columnss ) => (
                                        <th {...columnss.getHeaderProps()}>{columnss.render('Header')}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows?.map((row ) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells?.map((cell ) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default ReactTable;