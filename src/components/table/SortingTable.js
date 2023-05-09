import React, { useEffect, useMemo, useState } from 'react'
import { useTable,    useGlobalFilter , useSortBy ,usePagination } from 'react-table'
import { COLUMNS } from './Columns';
import { Checkbox } from './Checkbox';
import { Card } from '../card/card';




const datastyle ={
    padding: "0.938rem 1.5rem",
    "border-radius": "0.75rem",
   " font-weight": 500,
    "font-size": "1rem",
    "background": "transparent",
    "border-color": "#f4f4f4",
    "border": "1px solid #adb5bd",
    color:"gray",
  }



export const TestTable = ({tData}) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tData, [tData])
  
  function fncSelectedRow(row)
  {
    alert("data")
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy,usePagination
  )

const {pageIndex , pageSize} = state;
  return (
    <>
    <Card className="mb-3" >
    <>
      <table {...getTableProps()} className='table table-responsive'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={()=>{fncSelectedRow(row)}}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      
      </table>

      

   
    </>

      </Card>
      <div style={{textAlign:"right"}}>
        <span>
          Page {" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong> {' '}
        </span>
        <button className="btn btn-outline-theme btn-lg" disable={!canPreviousPage} onClick={()=> gotoPage(0)}>{"<<"}</button>
        <button  className="btn btn-outline-theme btn-lg" disable={!canPreviousPage} onClick={()=> previousPage()}>Previous</button>
        <button className="btn btn-outline-theme btn-lg" disabled={!canNextPage} onClick={()=> nextPage()}>Next</button>
        <button className="btn btn-outline-theme btn-lg"  disabled={!canNextPage} onClick={()=> gotoPage(pageCount -1)}>{">>"}</button>

        <select className="btn btn-outline-theme btn-lg" value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
          {
            [10,25,50,100].map(pageSize=>(
              <option value={pageSize} key={pageSize}>
                show {pageSize}
              </option>

              ))
          }
          </select> 

      
      </div>
    </>
  )
}

export default TestTable;
