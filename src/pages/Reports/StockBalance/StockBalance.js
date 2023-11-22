import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  NavItem,
  NavLink,
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import TableContainer from "../../../components/Common/TableContainer"
import classnames from "classnames"
import { Idno, Pdate, Type, Value, ValueInUsd, Amount } from "./StockBalanceCol"
import { useMemo } from "react"
import {
  getStockBalanceListByStock,
  getStockBalanceListByMaterial,
} from "store/actions"

const StockBalance = () => {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("FilterByStock")

  const { stockBalanceByStock } = useSelector(state => ({
    stockBalanceByStock: state.Reports.stockBalanceByStock,
  }))

  const { stockBalanceByMaterial } = useSelector(state => ({
    stockBalanceByMaterial: state.Reports.stockBalanceByMaterial,
  }))

  const [stockBalanceByStockData, setStockBalanceByStockData] = useState([
    stockBalanceByStock,
  ])
  const [stockBalanceByMaterialData, setStockBalanceByMaterialData] = useState([
    stockBalanceByMaterial,
  ])

  useEffect(() => {
    dispatch(getStockBalanceListByStock())
    dispatch(getStockBalanceListByMaterial())
    setStockBalanceByStockData(stockBalanceByStock)
    setStockBalanceByMaterialData(stockBalanceByMaterial)
    console.log(stockBalanceByStock)
    console.log("stockBalanceByStock")
  }, [])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  const columns = useMemo(
    () => [
      {
        Header: "Material Name",
        accessor: "materialName",
        filterable: true,
        Cell: cellProps => {
          return <Idno {...cellProps} />
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: cellProps => {
          return <Type {...cellProps} />
        },
      },
      {
        Header: "Unit",
        accessor: "unit",
        filterable: true,
        Cell: cellProps => {
          return <Value {...cellProps} />
        },
      },
      {
        Header: "Balance",
        accessor: "balance",
        filterable: true,
        Cell: cellProps => {
          return <Amount {...cellProps} />
        },
      },
    ],
    []
  )
  const columnsMaterial = useMemo(
    () => [
      {
        Header: "stock Name",
        accessor: "stockName",
        filterable: true,
        Cell: cellProps => {
          return <Idno {...cellProps} />
        },
      },

      {
        Header: "Balance",
        accessor: "balance",
        filterable: true,
        Cell: cellProps => {
          return <Amount {...cellProps} />
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Stock Balance</CardTitle>
                  <ul className="nav nav-tabs nav-tabs-custom">
                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "all",
                        })}
                        onClick={() => {
                          toggleTab("all")
                        }}
                      >
                        All
                      </NavLink>
                    </NavItem> */}
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "FilterByStock",
                        })}
                        onClick={() => {
                          toggleTab("FilterByStock")
                        }}
                      >
                        Filter By Stock
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "FilterByMaterial",
                        })}
                        onClick={() => {
                          toggleTab("FilterByMaterial")
                        }}
                      >
                        Filter By Material
                      </NavLink>
                    </NavItem>
                  </ul>
                  <div className="mt-4">
                    {activeTab === "FilterByStock" && (
                      <TableContainer
                        columns={columns}
                        data={stockBalanceByStock}
                        isGlobalFilter={true}
                        customPageSize={10}
                      />
                    )}

                    {activeTab === "FilterByMaterial" && (
                      <TableContainer
                        columns={columnsMaterial}
                        data={stockBalanceByMaterial}
                        isGlobalFilter={true}
                        customPageSize={10}
                      />
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default StockBalance
