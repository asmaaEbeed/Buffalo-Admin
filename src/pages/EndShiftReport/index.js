import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  FormFeedback,
  Table,
} from "reactstrap"

import { useFormik } from "formik"
import * as Yup from "yup"
import classnames from "classnames"
import classes from "./index.module.scss"
import CompaniesModal from "./Modal/CompaniesModal"
import SimpleBar from "simplebar-react"
import { Link } from "react-router-dom"

import { useParams, useNavigate } from "react-router-dom"

const EndShiftReport = () => {
  const { id } = useParams()

  const date = new Date()
  const [shiftId, setShiftId] = useState("")
  const [shiftData, setShiftData] = useState("")
  const [shiftExist, setShiftExist] = useState(false)
  const [shiftList, setShiftList] = useState([
    {
      id: 1,
      label: "Cashier1",
      dateTime: date,
      totalOrders: 200,
      totalOrdersAfterDisc: 80,
      discount: 0,
      totalCash: 60,
      totalVisa: 20,
      totalHost: 3,
      ordersCount: 10,
      returnsCount: 0,
      totalReturnValue: 0,
      expensesCount: 2,
      totalExpensesValue: 10,
      totalUnPaidDelivery: 0,
      totalUnpaidTables: 0,
      valueCarriedOverFrom: 0,
      valueCarriedOverTo: 0,
      netCash: 90,
      netOrderValue: 0,
      totalCompanies: 2,
    },
    {
      id: 2,
      label: "Cashier2",
      dateTime: date,
      totalOrders: 50,
      totalOrdersAfterDisc: 80,
      discount: 0,
      totalCash: 60,
      totalVisa: 20,
      totalHost: 3,
      ordersCount: 10,
      returnsCount: 0,
      totalReturnValue: 0,
      expensesCount: 2,
      totalExpensesValue: 10,
      totalUnPaidDelivery: 0,
      totalUnpaidTables: 0,
      valueCarriedOverFrom: 0,
      valueCarriedOverTo: 0,
      netCash: 90,
      netOrderValue: 0,
      totalCompanies: 2,
    },
  ])

  const [compList, setCompList] = useState([
    { id: 1, name: "comp1", balance: 50 },
    { id: 2, name: "comp2", balance: 20 },
  ])
  const [activeTab, setActiveTab] = useState("1")
  const [companyModal, setCompanyModal] = useState(false)

  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [tableRows, setTableRows] = useState([
    { id: 1, startShift: "09/12/2022", endShift: "10/12/2022" },
    { id: 2, startShift: "09/01/2023", endShift: "10/04/2023" },
  ])

  useEffect(() => {
    if (id) {
      console.log(id)
    }
  }, [])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const handleCompanyModal = () => {
    setCompanyModal(true)
  }

  const handleCompanyToggle = () => {
    setCompanyModal(!companyModal)
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      shiftId: shiftId || "",
    },
    validationSchema: Yup.object({
      shiftId: Yup.string().required("Please enter shift Id."),
    }),
    onSubmit: values => {
      console.log("submit")
      const shiftIdData = {
        shiftId: values["shiftId"],
      }
      shiftIdIsExist(values["shiftId"])

      // resetForm()
    },
  })

  const validationDate = useFormik({
    enableReinitialize: true,

    initialValues: {
      dateFrom: dateFrom || "",
      dateTo: dateTo || "",
    },
    validationSchema: Yup.object({
      dateFrom: Yup.string().required("Please select date from."),
      dateTo: Yup.string().required("Please enter date to."),
    }),
    onSubmit: values => {
      const datePeriod = {
        dateFrom: values["dateFrom"],
        dateTo: values["dateTo"],
      }
      console.log(datePeriod)

      // resetForm()
    },
  })
  const shiftIdIsExist = id => {
    for (let i = 0; i < shiftList.length; i++) {
      if (shiftList[i].id.toString() === id.toString()) {
        setShiftData(shiftList[i])
        setShiftExist(true)
        break
      }
    }
  }

  function handleViewDetails(id) {
    setShiftId("")
    setActiveTab("1")
    shiftIdIsExist(id)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <CardTitle className="mb-4">End Shift Report</CardTitle>
              <div>
                <Nav tabs className="nav-tabs-custom" role="tablist">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        toggleTab("1")
                      }}
                    >
                      Filter By Shift Id
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "2",
                      })}
                      onClick={() => {
                        toggleTab("2")
                      }}
                    >
                      Filter By Date
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={activeTab}
                  className="crypto-buy-sell-nav-content p-4"
                >
                  <TabPane tabId="1" id="buy">
                    <Row className="mb-3">
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <div className="d-flex">
                          <Label htmlFor="name" className="py-2">
                            Shift Id
                          </Label>
                          <div>
                            <Input
                              id="shiftId"
                              name="shiftId"
                              type="text"
                              className="w-auto mx-2"
                              placeholder="Enter Shift Id..."
                              onChange={e => setShiftId(e.target.value)}
                              onBlur={validation.handleBlur}
                              value={validation.values.shiftId || ""}
                              invalid={
                                validation.touched.shiftId &&
                                validation.errors.shiftId
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.shiftId &&
                            validation.errors.shiftId ? (
                              <FormFeedback type="invalid">
                                {validation.errors.shiftId}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <button
                            type="submit"
                            className={`btn btn-success save-user mx-1 ${classes.btn_h_37}`}
                          >
                            View
                          </button>
                        </div>
                      </Form>
                    </Row>
                    <div>
                      <h3>{shiftData !== "" ? shiftData.label : ""}</h3>
                      <p>
                        {shiftData !== ""
                          ? `${shiftData.dateTime.getDate()} / ${
                              shiftData.dateTime.getMonth() + 1
                            }  / ${shiftData.dateTime.getFullYear()}`
                          : ""}
                      </p>
                    </div>

                    <Row>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Orders
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.totalOrders : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            After discount
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.totalOrdersAfterDisc
                              : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Discount
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.discount : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Cash
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.totalCash : "0"}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Visa
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.totalVisa : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Host
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.totalHost : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Orders Count
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.ordersCount : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Returns Count
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.returnsCount : "0"}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Returns
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.totalReturnValue
                              : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Expenses Count
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.expensesCount : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Expenses
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.totalExpensesValue
                              : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total UnPaid Delivery
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.totalUnPaidDelivery
                              : "0"}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Unpaid Tables
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.totalUnpaidTables
                              : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Value Carried Over From
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.valueCarriedOverFrom
                              : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Value Carried Over To
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== ""
                              ? shiftData.valueCarriedOverTo
                              : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Net Cash
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.netCash : "0"}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Net orders value
                          </Label>
                          <div className={`${classes.inputview}`}>
                            {shiftData !== "" ? shiftData.netOrderValue : "0"}
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="mb-3">
                          <Label className={`${classes.res_font}`}>
                            Total Companies
                          </Label>
                          <div
                            className={`${classes.btn_view} position-relative`}
                            onClick={handleCompanyModal}
                          >
                            {shiftData !== "" ? shiftData.totalCompanies : "0"}
                            <i
                              className={`mdi mdi-open-in-new d-block position-absolute ${classes.icon_absolute}`}
                            ></i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row className="mb-3">
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validationDate.handleSubmit()
                          return false
                        }}
                      >
                        <div className="d-flex">
                          <Label htmlFor="name" className="py-2">
                            From
                          </Label>
                          <div>
                            <Input
                              id="dateFrom"
                              name="dateFrom"
                              type="date"
                              className="w-auto mx-2"
                              placeholder="Enter Shift Id..."
                              onChange={e => setDateFrom(e.target.value)}
                              onBlur={validationDate.handleBlur}
                              value={validationDate.values.dateFrom || ""}
                              invalid={
                                validationDate.touched.dateFrom &&
                                validationDate.errors.dateFrom
                                  ? true
                                  : false
                              }
                            />
                            {validationDate.touched.dateFrom &&
                            validationDate.errors.dateFrom ? (
                              <FormFeedback type="invalid">
                                {validationDate.errors.dateFrom}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <Label htmlFor="name" className="py-2">
                            To
                          </Label>
                          <div>
                            <Input
                              id="dateTo"
                              name="dateTo"
                              type="date"
                              className="w-auto mx-2"
                              placeholder="Enter Shift Id..."
                              onChange={e => setDateTo(e.target.value)}
                              onBlur={validationDate.handleBlur}
                              value={validationDate.values.dateTo || ""}
                              invalid={
                                validationDate.touched.dateTo &&
                                validationDate.errors.dateTo
                                  ? true
                                  : false
                              }
                            />
                            {validationDate.touched.dateTo &&
                            validationDate.errors.dateTo ? (
                              <FormFeedback type="invalid">
                                {validationDate.errors.dateTo}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <button
                            type="submit"
                            className={`btn btn-success save-user mx-1 ${classes.btn_h_37}`}
                          >
                            View
                          </button>
                        </div>
                      </Form>

                      <div className="mt-4 mx-auto">
                        <SimpleBar
                          style={{
                            maxHeight: "195px",
                            width: "75%",
                            margin: "0 auto",
                          }}
                        >
                          <div className="table-responsive">
                            <Table className="table table-nowrap align-middle table-hover mb-0">
                              <tbody>
                                {(tableRows || []).map((tableRow, key) => (
                                  <tr key={key}>
                                    <td>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        {tableRow.id}
                                      </h5>
                                    </td>
                                    <td>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        {tableRow.startShift}
                                      </h5>
                                    </td>
                                    <td>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        {tableRow.endShift}
                                      </h5>
                                    </td>
                                    <td style={{ width: "90px" }}>
                                      <div>
                                        <ul className="list-inline mb-0 font-size-16">
                                          <li className="list-inline-item">
                                            <Link
                                              onClick={() =>
                                                handleViewDetails(tableRow.id)
                                              }
                                              className="text-primary p-1 border-none"
                                            >
                                              <i className="mdi mdi-eye-outline" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </SimpleBar>
                      </div>
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </Container>
        <CompaniesModal
          companyModal={companyModal}
          handleCompanyToggle={handleCompanyToggle}
          compList={compList}
        />
      </div>
    </React.Fragment>
  )
}
export default EndShiftReport
