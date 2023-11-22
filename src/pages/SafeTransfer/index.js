import React, { useEffect, useState } from "react"
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
  FormFeedback,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import axiosAuthInstance from "../../axios/axiosAuthInstance"

// //Import Date Picker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import classes from "./index.module.scss"
import currentDate from "../../common/currentDate"

const SafeTransfer = () => {
  //meta title
  document.title = "Safe-Transfer | Buffalo - Admin"

  // const [safeList, setSafeList] = useState([
  //   { id: 1, label: "safe1", value: 50 },
  //   { id: 2, label: "safe2", value: 400 },
  // ])
  const [safeList, setSafeList] = useState([])

  const [selectedSafeFrom, setSelectedSafeFrom] = useState("")
  const [safeFromBalance, setSafeFromBalance] = useState("")
  const [selectedSafeTo, setSelectedSafeTo] = useState("")
  const [safeToBalance, setSafeToBalance] = useState("")

  const [note, setNote] = useState("")

  const [transferValue, setTransferValue] = useState("")
  const [transferAllow, setTransferAllow] = useState(true)

  const [payNo, setPayNo] = useState("")
  const [transDate, setTransDate] = useState("")

  const [fkEmpFrom, setEmpFrom] = useState("")
  const [toast8, setToast8] = useState(true)

  // GET Safe List Data From Api

  const fetchAllSafe = React.useCallback(async () => {
    const fetchedDeptData = await axiosAuthInstance.get("TblSafe/getPage")
    setSafeList(fetchedDeptData.data.rs.data)
  })
  useEffect(() => {
    fetchAllSafe()
    setEmpFrom(JSON.parse(localStorage.getItem("authUser")).pkEmpId)
    setTransDate(currentDate)
  }, [])

  useEffect(() => {
    handleTransferValue(transferValue)
  }, [safeFromBalance])

  const handleSelectfromSafe = e => {
    setSelectedSafeFrom(e.target.value)
    handleSafeFromBalance(e.target.value)
  }

  const handleSafeFromBalance = e => {
    safeList.map(safe => {
      Number(safe.pkSafeId) === Number(e) && setSafeFromBalance(safe.balance)
      return
    })
  }

  const handleSelectToSafe = e => {
    setSelectedSafeTo(e.target.value)
    handleSafeToBalance(e.target.value)
  }

  const handleSafeToBalance = e => {
    safeList.map(safe => {
      Number(safe.id) === Number(e) && setSafeToBalance(safe.balance)
      return
    })
  }

  // Upload Files

  const [selectedFiles, setselectedFiles] = useState([])

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

  const handleTransferValue = e => {
    if (Number(e) > Number(safeFromBalance)) {
      setTransferAllow(false)
    } else {
      setTransferAllow(true)
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      selectedSafeFrom: selectedSafeFrom || "",
      selectedSafeTo: selectedSafeTo || "",
      transferValue: transferValue || "",
      payNo: payNo || "",
      transDate: transDate || "",
      note: note || "",
      fkEmpFrom: fkEmpFrom || "",
    },
    validationSchema: Yup.object({
      selectedSafeFrom: Yup.string().required("Please select Safe from."),
      selectedSafeTo: Yup.string().required("Please select Safe to."),
      transferValue: Yup.number().required("Please Enter Transfer value."),
      payNo: Yup.string().required("Please Enter Payment Number."),
    }),
    onSubmit: async values => {
      const newSafeTransfer = {
        fkSafeFrom: values["selectedSafeFrom"],
        fkSafeTo: values["selectedSafeTo"],
        value: values["transferValue"],
        payNo: values["payNo"],
        notes: values["note"],
        transDate: values["transDate"],
        fkEmpFrom: values["fkEmpFrom"],
      }

      if (transferAllow) {
        try {
          const safeTransfereRes = await postSafeTransfere(newSafeTransfer)
        if (safeTransfereRes.status === 200) {
          toast.dismiss()
          toast.success("Transfer was completed successfully.")
          resetForm()
        } 
      } catch (err) {
        toast.dismiss()
        toast.error("Problem occured. Please, try again.");
        console.log(err)
      }
      }
    },
  })

  const postSafeTransfere = async e => {
    console.log(e)
    const transferRes = await axiosAuthInstance.post("TblSafeTransfere/save", e)
    if (transferRes) {
      return transferRes
    }
  }

  const resetForm = () => {
    setSelectedSafeFrom("")
    setSafeFromBalance("")
    setSelectedSafeTo("")
    setTransferValue("")
    setPayNo("")
    setNote("")
    setselectedFiles([])
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Safe Transfer</CardTitle>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row>
                      <Col sm="4">
                        <div className="mb-3">
                          <Label>From Safe</Label>
                          <Input
                            name="selectedSafeFrom"
                            type="select"
                            onChange={e => {
                              handleSelectfromSafe(e)
                            }}
                            onBlur={validation.handleBlur}
                            value={validation.values.selectedSafeFrom || ""}
                            invalid={
                              validation.touched.selectedSafeFrom &&
                              validation.errors.selectedSafeFrom
                                ? true
                                : false
                            }
                          >
                            <option value="" disabled>
                              Select Safe From...
                            </option>
                            {safeList.map((safe, index) => (
                              <option key={index} value={safe.pkSafeId}>
                                {safe.safeName}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.selectedSafeFrom &&
                          validation.errors.selectedSafeFrom ? (
                            <FormFeedback type="invalid">
                              {validation.errors.selectedSafeFrom}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div className="mb-3">
                          <Label>safe Balance: </Label>
                          <div className={`${classes.inputview}`}>
                            {safeFromBalance}
                          </div>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label for="basicpill-lastname-input2">To:</Label>

                          <Input
                            name="selectedSafeTo"
                            type="select"
                            onChange={e => {
                              handleSelectToSafe(e)
                            }}
                            onBlur={validation.handleBlur}
                            value={validation.values.selectedSafeTo || ""}
                            invalid={
                              validation.touched.selectedSafeTo &&
                              validation.errors.selectedSafeTo
                                ? true
                                : false
                            }
                          >
                            <option value="" disabled>
                              Select Safe To...
                            </option>
                            {safeList.map((safe, index) => (
                              <option key={index} value={safe.pkSafeId}>
                                {safe.safeName}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.selectedSafeTo &&
                          validation.errors.selectedSafeTo ? (
                            <FormFeedback type="invalid">
                              {validation.errors.selectedSafeTo}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label for="transferValue">Value</Label>
                          <Input
                            id="transferValue"
                            name="transferValue"
                            type="number"
                            className={`${
                              !transferAllow && "is-invalid "
                            } form-control`}
                            placeholder="Enter value..."
                            onBlur={validation.handleBlur}
                            value={validation.values.transferValue || ""}
                            invalid={
                              validation.touched.transferValue &&
                              validation.errors.transferValue
                                ? true
                                : false
                            }
                            onChange={e => {
                              setTransferValue(e.target.value)
                              handleTransferValue(e.target.value)
                            }}
                            min={0}
                          />
                          {validation.touched.transferValue &&
                          validation.errors.transferValue ? (
                            <FormFeedback type="invalid">
                              {validation.errors.transferValue}
                            </FormFeedback>
                          ) : null}
                          {!transferAllow && safeFromBalance !== "" && (
                            <div className={`${classes.invalid_message}`}>
                              The balance is insufficient.
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label for="payNo">Pay No.</Label>
                          <Input
                            id="payNo"
                            name="payNo"
                            type="number"
                            className="form-control"
                            placeholder="Enter pay no...."
                            onBlur={validation.handleBlur}
                            value={validation.values.payNo || ""}
                            invalid={
                              validation.touched.payNo &&
                              validation.errors.payNo
                                ? true
                                : false
                            }
                            onChange={e => setPayNo(e.target.value)}
                            min={0}
                          />
                          {validation.touched.payNo &&
                          validation.errors.payNo ? (
                            <FormFeedback type="invalid">
                              {validation.errors.payNo}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <Label for="note">Note</Label>
                        <textarea
                          className="form-control"
                          id="note"
                          rows="5"
                          placeholder="Enter Notes..."
                          value={note}
                          onChange={e => setNote(e.target.value)}
                        />
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label>Supplier Name</Label>
                          <Input
                            name="selectedSupplier"
                            type="select"
                            onChange={e => {
                              validation.handleChange
                              handleSelectedSupplier(e)
                            }}
                            onBlur={validation.handleBlur}
                            value={validation.values.selectedSupplier || ""}
                            invalid={
                              validation.touched.selectedSupplier &&
                              validation.errors.selectedSupplier
                                ? true
                                : false
                            }
                          >
                            <option value="">Select Supplier Name...</option>
                            {supplierList.map((supplier, index) => (
                              <option key={index} value={supplier.value}>
                                {supplier.label}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.selectedSupplier &&
                          validation.errors.selectedSupplier ? (
                            <FormFeedback type="invalid">
                              {validation.errors.selectedSupplier}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label for="basicpill-lastname-input2">
                            Invoice Number
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-lastname-input2"
                            placeholder="Enter Invoice Number"
                            name="invoiceNumber"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.invoiceNumber}
                            invalid={
                              validation.touched.invoiceNumber &&
                              validation.errors.invoiceNumber
                                ? true
                                : false
                            }
                          />
                          {validation.touched.invoiceNumber &&
                          validation.errors.invoiceNumber ? (
                            <FormFeedback type="invalid">
                              {validation.errors.invoiceNumber}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row> */}
                    <Row className="mb-4">
                      <Label>Attached Files</Label>
                      <Col lg="12">
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
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Col>
                        <Button type="submit" color="primary">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SafeTransfer
