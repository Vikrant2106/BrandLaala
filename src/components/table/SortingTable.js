import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
// import { COLUMNS } from './Columns';
import { Checkbox } from './Checkbox';
import { Card } from '../card/card';
import ConfirmationModal from '../../modal/ConfirmationModal';
import axios from 'axios';
import { successToast, failureToast } from '../toast/toast';




const datastyle = {
  padding: "0.938rem 1.5rem",
  "border-radius": "0.75rem",
  " font-weight": 500,
  "font-size": "1rem",
  "background": "transparent",
  "border-color": "#f4f4f4",
  "border": "1px solid #adb5bd",
  color: "gray",
}



export const TestTable = ({ tData, fncEditModalData, fncApiCall }) => {

  var COLUMNS = [

    {
      Header: 'Id',
      Footer: 'id',
      accessor: '_id'
    },
    {
      Header: 'First Name',
      Footer: 'first_name',
      accessor: 'first_name'
    },
    {
      Header: 'Last Name',
      Footer: 'last_name',
      accessor: 'last_name'
    },
    {
      Header: 'Email',
      Footer: 'email',
      accessor: 'email'
    },
    // {
    // 	Header: 'Gender',
    // 	Footer: 'gender',
    // 	accessor: 'gender'
    // },
    // {
    // 	Header: 'Dob',
    // 	Footer: 'dob',
    // 	accessor: 'dob'
    // },
    {
      Header: 'Instagram',
      Footer: 'instagram',
      accessor: 'instagram_account'
    },
    {
      Header: 'Facebook',
      Footer: 'facebook',
      accessor: 'facebook_account'
    },
    {
      Header: 'Mobile',
      Footer: 'mobile',
      accessor: 'mobile'
    },
    {
      Header: 'Visit Date',
      Footer: 'Visit Date',
      accessor: 'enquiry_date'
    },
    {
      Header: 'Action',
      Footer: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (<>
        <span onClick={() => fncEditData(row)} style={{ marginRight: "15px" }} className="bi  bi-eye" ></span>
        <span className="bi bi-trash" onClick={() => fncDeleteData(row)} ></span>
      </>)
    },

  ]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tData, [tData])
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState()

  function fncEditData(data) {
    fncEditModalData(data?.original)
  }

  function fncDeleteData(data) {
    setSelectedDeleteId(data?.original?._id)
    fncsetIsShowConfirmationModal(true)
  }

  function fncsetIsShowConfirmationModal(data) {
    setIsShowConfirmationModal(data)
  }
  async function deleteEnquiryData() {
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}enquiry/${selectedDeleteId}`
    );
     
    return res?.data;
  }

  async function fncOnOKClick(data) {
    var res = await deleteEnquiryData();
    if (res?.status === 1) {
      successToast(res?.message);
      fncsetIsShowConfirmationModal(data)
      fncApiCall();
    }
    else {
      successToast(res?.message);
    }

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
    useSortBy, usePagination
  )

  const { pageIndex, pageSize } = state;
  return (
    <>

      <ConfirmationModal
        isShowConfirmationModal={isShowConfirmationModal}
        fncsetIsShowConfirmationModal={fncsetIsShowConfirmationModal}
        fncOnOKClick={fncOnOKClick}
      />
      <Card className="mb-3" >
      <div className="table-responsive">
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
                  <tr {...row.getRowProps()} >
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {/* <div style={{ textAlign: "right" }}>
        <span>
          Page {" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong> {' '}
        </span>
        <button className="btn btn-outline-theme btn-lg" disable={!canPreviousPage} onClick={() => gotoPage(0)}>{"<<"}</button>
        <button className="btn btn-outline-theme btn-lg" disable={!canPreviousPage} onClick={() => previousPage()}>Previous</button>
        <button className="btn btn-outline-theme btn-lg" disabled={!canNextPage} onClick={() => nextPage()}>Next</button>
        <button className="btn btn-outline-theme btn-lg" disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>{">>"}</button>
        <select className="btn btn-outline-theme btn-lg" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [10, 25, 50, 100].map(pageSize => (
              <option value={pageSize} key={pageSize}>
                show {pageSize}
              </option>

            ))
          }
        </select>
      </div> */}
    </>
  )
}

export default TestTable;
