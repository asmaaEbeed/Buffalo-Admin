import React, { useState } from "react"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"
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
} from "reactstrap"

// //Import Date Picker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import classes from "../Products/index.module.scss"

const Expenses = () => {
  //meta title
  document.title = "Purchases List | Buffalo - Admin"

  // const [startDate, setstartDate] = useState(new Date());
  // const [endDate, setendDate] = useState(new Date());
  const [selectedFiles, setselectedFiles] = useState([])

  const [otherSafe, setOtherSafe] = useState(false)
  const [expenseName, setExpenseName] = useState("")
  const [note, setNote] = useState("")
  const [expenseValue, setExpenseValue] = useState("")

  // const startDateChange = date => {
  //   console.log(date)
  //   setstartDate(date);
  // };

  // const endDateChange = date => {
  //   console.log(date)
  //   setendDate(date);
  // };

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const handleSafe = e => {
    e === "otherSafe" ? setOtherSafe(true) : setOtherSafe(false)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Add Expenses</CardTitle>
                  <Form>
                    <FormGroup className="mb-4" row>
                      <Label htmlFor="name" className="col-form-label col-sm-2">
                        Name
                      </Label>
                      <Col sm="10">
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Enter Name..."
                          value={expenseName}
                          onChange={e => setExpenseName(e.target.value)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label htmlFor="note" className="col-form-label col-sm-2">
                        Note
                      </Label>
                      <Col sm="10">
                        <textarea
                          className="form-control"
                          id="note"
                          rows="3"
                          placeholder="Enter Notes..."
                          value={note}
                          onChange={e => setNote(e.target.value)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="value"
                        className="col-form-label col-sm-2"
                      >
                        Value
                      </label>
                      <Col sm="10">
                        <Input
                          id="value"
                          name="value"
                          type="text"
                          placeholder="Enter Value..."
                          className="form-control"
                          value={expenseValue}
                          onChange={e => setExpenseValue(e.target.name)}
                        />
                      </Col>
                    </FormGroup>

                    {/* <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Project Date
                          </Label>
                          <Col lg="10">
                            <Row>
                              <Col md={6} className="pr-0">
                                <DatePicker
                                  className="form-control"
                                  selected={startDate}
                                  onChange={startDateChange}
                                />
                              </Col>
                              <Col md={6} className="pl-0">                               
                                <DatePicker
                                  className="form-control"
                                  selected={endDate}
                                  onChange={endDateChange}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </FormGroup> */}
                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="value"
                        className="col-form-label col-sm-2"
                      >
                        Safe
                      </label>
                      <Col  sm={6}>
                        <div className="">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="safe"
                            id="cash"
                            value="cash"
                            defaultChecked
                            onChange={e => handleSafe(e.target.value)}
                          />
                          <label
                            className="form-check-label px-3"
                            htmlFor="cash"
                          >
                            Cash
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="safe"
                            id="exampleRadios2"
                            value="otherSafe"
                            onChange={e => handleSafe(e.target.value)}
                          />
                          <label
                            className="form-check-label px-3"
                            htmlFor="exampleRadios2"
                          >
                            Other Safe
                          </label>
                        </div>
                      </Col>
                    </FormGroup>
                    {otherSafe && <FormGroup row>
                      <Col sm={2}>
                        <label className="col-form-label">
                          Select
                        </label>
                      </Col>
                      <Col  sm={10}>
                        <div className="col-md-10">
                          <select className="form-control">
                            <option>Select</option>
                            <option>Large select</option>
                            <option>Small select</option>
                          </select>
                        </div>
                      </Col>
                    </FormGroup>}
                  </Form>

                  <Row className="mb-4">
                    <Label className="col-form-label col-lg-2">
                      Attached Files
                    </Label>
                    <Col lg="10">
                      <Form>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles)
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div
                              className={`dropzone ${classes.dropzone_area}`}
                            >
                              <div
                                className={`dz-message needsclick mt-1 ${classes.dz_message_area}`}
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div
                                  className={`dz-message needsclick mt-1 ${classes.dz_message_area}`}
                                >
                                  <div className="mb-1">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                      </Form>
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col lg="10">
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Expenses
