import React, { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  FormFeedback,
} from "reactstrap"

import { useFormik } from "formik"
import * as Yup from "yup"
import classes from "./index.module.scss"
import axiosAuthInstance from "../../axios/axiosAuthInstance"

// import EndShiftPDF from "./EndShiftPDF.js"

const EndShift = () => {
  const [empList, setEmpList] = useState([
    {
      id: 1,
      label: "Cashier1",
      totalOrders: 200,
      totalOrdersAfterDisc: 80,
      totalCash: 60,
      totalVisa: 20,
      totalCompanies: 2,
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
    },
    {
      id: 2,
      label: "Cashier2",
      totalOrders: 100,
      totalOrdersAfterDisc: 80,
      totalCash: 60,
      totalVisa: 20,
      totalCompanies: 2,
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
    },
  ])
  const [empForEndShift, setEmpForEndShift] = useState([])

  const [selectedEmp, setSelectedEmp] = useState("")

  const [endShiftPDF, setEndShiftPDF ] = useState(false)

  // GET Safe List Data From Api

  const fetchEmpForEndShift = React.useCallback(async () => {
    const empDataFetched = await axiosAuthInstance.get("Admin/GetEmpsforEndShift")
    console.log(empDataFetched)
    setEmpForEndShift(empDataFetched.data)
  })
  useEffect(() => {
    fetchEmpForEndShift()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      selectedEmp: selectedEmp.id || "",
    },
    validationSchema: Yup.object({
      selectedEmp: Yup.string().required("Please select Employee."),
    }),
    onSubmit: values => {
      console.log("submit")
      const endShift = {
        selectedEmp: values["selectedEmp"],
      }

      resetForm()
    },
  })

  const handleSelectedEmp = e => {
    console.log(e)
    empList.map(emp => Number(emp.id) === Number(e) && setSelectedEmp(emp))
    console.log(selectedEmp)
  }

  const resetForm = () => {}

  const handleEndShiftPDF = () => {
    setEndShiftPDF(true)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <CardTitle className="mb-4">End Shift</CardTitle>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col sm="6">
                    <div className="mb-3">
                      <Label>Employee</Label>
                      <Input
                        name="selectedEmp"
                        type="select"
                        onChange={e => {
                          handleSelectedEmp(e.target.value)
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values.selectedEmp || ""}
                        invalid={
                          validation.touched.selectedEmp &&
                          validation.errors.selectedEmp
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Select Employee...
                        </option>
                        {empForEndShift.map((emp, index) => (
                          <option key={index} value={emp.PK_Shift_ID}>
                            {emp.EmpName}
                          </option>
                        ))}
                      </Input>
                      {validation.touched.selectedEmp &&
                      validation.errors.selectedEmp ? (
                        <FormFeedback type="invalid">
                          {validation.errors.selectedEmp}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Total Orders
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.totalOrders : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        After discount
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== ""
                          ? selectedEmp.totalOrdersAfterDisc
                          : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Total Cash
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.totalCash : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Total Visa
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.totalVisa : "0"}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Total Companies
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.totalCompanies : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Total Host
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.totalHost : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Orders Count
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.ordersCount : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Returns Count
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.returnsCount : "0"}
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
                        {selectedEmp !== ""
                          ? selectedEmp.totalReturnValue
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
                        {selectedEmp !== "" ? selectedEmp.expensesCount : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>
                        Total Expenses
                      </Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== ""
                          ? selectedEmp.totalExpensesValue
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
                        {selectedEmp !== ""
                          ? selectedEmp.totalUnPaidDelivery
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
                        {selectedEmp !== ""
                          ? selectedEmp.totalUnpaidTables
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
                        {selectedEmp !== ""
                          ? selectedEmp.valueCarriedOverFrom
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
                        {selectedEmp !== ""
                          ? selectedEmp.valueCarriedOverTo
                          : "0"}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} xs={6}>
                    <div className="mb-3">
                      <Label className={`${classes.res_font}`}>Net Cash</Label>
                      <div className={`${classes.inputview}`}>
                        {selectedEmp !== "" ? selectedEmp.netCash : "0"}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                    <button
                        type="submit"
                        className="btn btn-success save-user mx-1"
                      >
                        Manager Approval
                      </button>
                      <button
                        type="button"
                        className="btn btn-success save-user mx-1"
                      >
                        PDF
                      </button>
                      <button
                        type="button"
                        className="btn btn-success save-user mx-1"
                        onClick={handleEndShiftPDF}
                      >
                        Send PDF
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
              {/* {endShiftPDF && <EndShiftPDF />} */}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EndShift
