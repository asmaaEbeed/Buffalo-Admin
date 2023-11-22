import React, { useEffect, useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
} from "reactstrap"

import { useFormik } from "formik"
import Select from "react-select"
import classnames from "classnames"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import Dropzone from "react-dropzone"
import classes from "../Products/index.module.scss"
import axiosAuthInstance from "../../axios/axiosAuthInstance"

const Purchase = () => {
  //meta title
  document.title = "Purchases List | Buffalo - Admin"

  const [activeTab, setactiveTab] = useState(1)

  const [passedSteps, setPassedSteps] = useState([1])

  const [supplierList, setSupplierList] = useState([])

  const [storeList, setStoreList] = useState([])

  const [paymentList, setPaymentList] = useState([
    { id: 1, label: "method 1", value: "method 1" },
    { id: 2, label: "method 2", value: "method 2" },
  ])

  const [safeList, setSafeList] = useState([])

  const [rawItemList, setRawItemList] = useState([])

  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [selectStore, setSelectStore] = useState("")
  const [purchaseDate, setPurchaseDate] = useState("")
  const [selectPayment, setSelectPayment] = useState("")
  const [selectSafe, setSelectSafe] = useState("")

  const [selectedItem, setSelectedItem] = useState("")
  const [rawMaterialQty, setRawMaterialQty] = useState("")
  const [rawMaterialPrice, setrawMaterialPrice] = useState("")

  const [firstSelectedItemRaw, setFirstSelectedItemRaw] = useState("")
  const [firstRawMaterialPrice, setFirstRawMaterialPrice] = useState("")
  const [firstRawMaterialQty, setFirstRawMaterialQty] = useState("")

  const [totalPrice, setTotalPrice] = useState(0.0)

  const [addError, setAddError] = useState(false)

  const [paymentChecked, setPaymentChecked] = useState(false)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  // GET Store List Data From Api

  const fetchAllStores = React.useCallback(async () => {
    const fetchedStoreData = await axiosAuthInstance.get("TblStore/getPage")
    console.log(fetchedStoreData)
    setStoreList(fetchedStoreData.data.rs.data)
  })

  // GET safe List Data From Api

  const fetchAllSafe = React.useCallback(async () => {
    const fetchedSafeData = await axiosAuthInstance.get("TblSafe/getPage")
    console.log(fetchedSafeData)
    setSafeList(fetchedSafeData.data.rs.data)
  })

  // GET material List Data From Api

  const fetchAllMaterial = React.useCallback(async () => {
    const fetchedMaterialData = await axiosAuthInstance.get("TblMaterial/getPage")
    console.log(fetchedMaterialData)
    setRawItemList(fetchedMaterialData.data.rs.data)
  })

  // GET Supplier List Data From Api

  const fetchSupplierList = React.useCallback(async () => {
    const fetchedSupplierData = await axiosAuthInstance.get("TblSupplier/getPage")
    console.log(fetchedSupplierData)
    setSupplierList(fetchedSupplierData.data.rs.data)
  })

  useEffect(() => {
    fetchAllStores()
    fetchAllSafe()
    fetchAllMaterial()
    fetchSupplierList()
  }, [])

  function handleSelectedSupplier(selectedSupplier) {
    setSelectedSupplier(selectedSupplier.target.value)
  }

  function handleSelectedStore(selectedStore) {
    setSelectStore(selectedStore.target.value)
  }

  function handleSelectPayment(e) {
    e.preventDefault()
    setSelectPayment(e.target.value)
  }
  function handleSelectSafe(e) {
    setSelectSafe(e.target.value)
  }

  const submitForm = () => {
    validation.handleSubmit()
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      selectedSupplier: selectedSupplier || "",
      invoiceNumber: invoiceNumber || "",
      selectStore: selectStore || "",
      purchaseDate: purchaseDate || "",
      selectPayment: selectPayment || "",
      selectSafe: selectSafe || "",
    },
    validationSchema: Yup.object({
      selectedSupplier: Yup.string().required("Please select supplier."),
      invoiceNumber: Yup.string().required("Please enter invoice number."),
      selectStore: Yup.string().required("Please select store."),
      purchaseDate: Yup.string().required("Please enter date"),
      selectPayment: Yup.string().required("Please Select Payment Method"),
      selectSafe: Yup.string().required("Please select safe"),
    }),
    onSubmit: values => {
      const newPurchaseData = {
        selectedSupplier: values["selectedSupplier"],
        invoiceNumber: values["invoiceNumber"],
        selectStore: values["selectStore"],
        purchaseDate: values["purchaseDate"],
        selectPayment: values["selectPayment"],
        selectSafe: values["selectSafe"],
      }
      // save new user
      //dispatch(onAddNewUser(newArea))

      toggleTab(activeTab + 1)

      // validation.resetForm()
    },
  })

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

  const keyField = "id"

  const [formRows, setFormRows] = useState([])

  const resetRow = () => {
    setFirstSelectedItemRaw("")
    setFirstRawMaterialQty("")
    setFirstRawMaterialPrice("")
  }

  const onAddFormRow = () => {
    if (
      firstSelectedItemRaw !== "" &&
      firstRawMaterialQty !== "" &&
      firstRawMaterialQty >= 1 &&
      firstRawMaterialPrice !== "" &&
      firstRawMaterialPrice >= 1
    ) {
      setAddError(false)
      const newMaterialRaw = {
        selectedItem: firstSelectedItemRaw,
        rawMaterialQty: firstRawMaterialQty,
        rawMaterialPrice: firstRawMaterialPrice,
      }
      const modifiedRows = [...formRows]

      modifiedRows.push({ id: modifiedRows.length + 1, ...newMaterialRaw })
      // modifiedRows.unshift({ id: modifiedRows.length + 1 })
      setFormRows(modifiedRows)

      addToTotalPrice(firstRawMaterialQty, firstRawMaterialPrice)

      resetRow()
    } else {
      setAddError(true)
    }
  }

  const onDeleteFormRow = id => {
    var modifiedRows = [...formRows]
    modifiedRows.map(row => row["id"] === id && subFromTotalPrice(row))
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    setFormRows(modifiedRows)
  }

  //Raw Details

  const handleSelectItem = e => {
    setSelectedItem(e.target.value)
  }

  const handleRawMaterialQty = e => {
    setRawMaterialQty(e.target.value)
  }

  const handleRawMaterialPrice = e => {
    setrawMaterialPrice(e.target.value)
  }

  const handleFirstSelectItemRaw = e => {
    setFirstSelectedItemRaw(e.target.value)
  }
  const handleFirstRawMaterialQty = e => {
    setFirstRawMaterialQty(e.target.value)
  }
  const handleFirstRawMaterialPrice = e => {
    setFirstRawMaterialPrice(e.target.value)
  }

  const addToTotalPrice = (qty, price) => {
    const newTotalPrice = totalPrice + Number(qty) * Number(price)
    setTotalPrice(newTotalPrice)
  }

  const subFromTotalPrice = item => {
    const newTotalPrice =
      totalPrice - Number(item.rawMaterialQty) * Number(item.rawMaterialPrice)
    setTotalPrice(newTotalPrice)
  }

  // Submit last tabPan
  const submitAllForm = () => {
    toggleTab(activeTab - 1)
    validation.resetForm()
    setSelectedSupplier("")
    setSelectStore("")
    setSelectPayment("")
    setSelectSafe("")
    setFormRows([])
    resetRow()
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> Purchase Data
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                            disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Add Raw Material
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <Form>
                            <Row>
                              <Col sm="6">
                                <div className="mb-3">
                                  <Label>Supplier Name</Label>
                                  <Input
                                    name="selectedSupplier"
                                    type="select"
                                    onChange={e => {
                                      handleSelectedSupplier(e)
                                    }}
                                    onBlur={validation.handleBlur}
                                    value={
                                      validation.values.selectedSupplier || ""
                                    }
                                    invalid={
                                      validation.touched.selectedSupplier &&
                                      validation.errors.selectedSupplier
                                        ? true
                                        : false
                                    }
                                  >
                                    <option value="">
                                      Select Supplier Name...
                                    </option>
                                    {supplierList.map((supplier, index) => (
                                      <option
                                        key={index}
                                        value={supplier.pkSupplierId}
                                      >
                                        {supplier.supplierName}
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
                                    onChange={(e)=> setInvoiceNumber(e.target.value)}
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
                            </Row>

                            <Row>
                              <Col sm="6">
                                <div className="mb-3">
                                  <Label>Store Name</Label>
                                  <Input
                                    name="selectStore"
                                    type="select"
                                    onChange={e => {
                                      handleSelectedStore(e)
                                    }}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.selectStore || ""}
                                    invalid={
                                      validation.touched.selectStore &&
                                      validation.errors.selectStore
                                        ? true
                                        : false
                                    }
                                  >
                                    <option value="">
                                      Select Store Name...
                                    </option>
                                    {storeList.map((store, index) => (
                                      <option key={index} value={store.pkStoreId}>
                                        {store.storeName}
                                      </option>
                                    ))}
                                  </Input>
                                  {validation.touched.selectStore &&
                                  validation.errors.selectStore ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.selectStore}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col sm="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    Purchase Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    name="purchaseDate"
                                    onChange={(e)=>setPurchaseDate(e.target.value)}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.purchaseDate || ""}
                                    invalid={
                                      validation.touched.purchaseDate &&
                                      validation.errors.purchaseDate
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.purchaseDate &&
                                  validation.errors.purchaseDate ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.purchaseDate}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12}>
                                <div className="form-check form-switch form-switch-md mb-3">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizemd"
                                    onChange={e =>
                                      setPaymentChecked(e.target.checked)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizemd"
                                  >
                                    Payment Options
                                  </label>
                                </div>
                              </Col>
                            </Row>
                            {paymentChecked && (
                              <Row>
                                <Col sm="6">
                                  <div className="mb-3">
                                    <Label>Payment Method</Label>
                                    <Input
                                      name="selectPayment"
                                      type="select"
                                      onChange={e => {
                                        validation.handleChange
                                        handleSelectPayment(e)
                                      }}
                                      onBlur={validation.handleBlur}
                                      value={
                                        validation.values.selectPayment || ""
                                      }
                                      invalid={
                                        validation.touched.selectPayment &&
                                        validation.errors.selectPayment
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="">
                                        Select Payment Method...
                                      </option>
                                      {paymentList.map((method, index) => (
                                        <option
                                          key={index}
                                          value={method.value}
                                        >
                                          {method.label}
                                        </option>
                                      ))}
                                    </Input>
                                    {validation.touched.selectPayment &&
                                    validation.errors.selectPayment ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.selectPayment}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                                <Col sm="6">
                                  <div className="mb-3">
                                    <Label>Safe</Label>
                                    <Input
                                      name="selectSafe"
                                      type="select"
                                      onChange={e => {
                                        validation.handleChange
                                        handleSelectSafe(e)
                                      }}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.selectSafe || ""}
                                      invalid={
                                        validation.touched.selectSafe &&
                                        validation.errors.selectSafe
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="">
                                        Select Store Name...
                                      </option>
                                      {safeList.map((safe, index) => (
                                        <option key={index} value={safe.pkSafeId}>
                                          {safe.safeName}
                                        </option>
                                      ))}
                                    </Input>
                                    {validation.touched.selectStore &&
                                    validation.errors.selectSafe ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.selectSafe}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>
                            )}
                            <Row>
                              <div className="mb-3">
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
                                        className={`dz-message needsclick mt-2 ${classes.dz_message_area}`}
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <div className="mb-3">
                                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                                        </div>
                                        <h4>
                                          Drop files here or click to upload.
                                        </h4>
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
                                                <strong>
                                                  {f.formattedSize}
                                                </strong>
                                              </p>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Card>
                                    )
                                  })}
                                </div>
                              </div>
                            </Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div style={{ minHeight: "300px" }}>
                            <Form
                              className="repeater"
                              encType="multipart/form-data"
                            >
                              <Row>
                                <Col sm={4} className="mb-3">
                                  <Input
                                    name="selectedItem"
                                    type="select"
                                    onChange={e => {
                                      handleFirstSelectItemRaw(e)
                                    }}
                                    value={firstSelectedItemRaw}
                                  >
                                    <option value="">
                                      Select Material Name...
                                    </option>
                                    {rawItemList.map((rawItem, index) => (
                                      <option key={index} value={rawItem.pkMaterialId}>
                                        {rawItem.materialName}
                                      </option>
                                    ))}
                                  </Input>
                                </Col>

                                <Col sm={3} xs={6} className="mb-3">
                                  <Input
                                    type="number"
                                    id="quantity"
                                    min="0"
                                    className="form-control"
                                    placeholder="Enter Quantity"
                                    value={firstRawMaterialQty}
                                    onChange={e => handleFirstRawMaterialQty(e)}
                                  />
                                </Col>

                                <Col sm={3} xs={6} className="mb-3">
                                  <Input
                                    type="number"
                                    id="price"
                                    min="0"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    value={firstRawMaterialPrice}
                                    onChange={e =>
                                      handleFirstRawMaterialPrice(e)
                                    }
                                  />
                                </Col>
                                <Col sm={2}>
                                  <div className="text-end">
                                    <input
                                      type="button"
                                      className="btn btn-success mb-3 mt-lg-0"
                                      onClick={onAddFormRow}
                                      value="Add"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              {addError && (
                                <Row>
                                  <Col xs={12}>
                                    <span style={{ color: "#cd0000" }}>
                                      Please fill all field
                                    </span>
                                  </Col>
                                </Row>
                              )}
                              <hr
                                style={{
                                  borderTop: "1px solid #d5d5d5",
                                  margin: "3px 0",
                                }}
                              />
                            </Form>
                            <div
                              style={{ maxHeight: "350px", overflowY: "auto" }}
                            >
                              {(formRows || []).map((formRow, key) => (
                                <Row key={key} style={{ margin: "5px 0" }}>
                                  <Col sm={4} className="mb-3">
                                    <Input
                                      name="selectedItem"
                                      type="select"
                                      onChange={e => {
                                        handleSelectItem(e)
                                      }}
                                      value={formRow.selectedItem}
                                      disabled
                                    >
                                      <option value="">
                                        Select Item Name...
                                      </option>
                                      {rawItemList.map((rawItem, index) => (
                                        <option
                                          key={index}
                                          value={rawItem.pkMaterialId}
                                        >
                                          {rawItem.materialName}
                                        </option>
                                      ))}
                                    </Input>
                                  </Col>

                                  <Col sm={3} xs={5} className="mb-3">
                                    <Input
                                      type="number"
                                      id="quantity"
                                      className="form-control"
                                      placeholder="Enter Quantity"
                                      value={formRow.rawMaterialQty}
                                      onChange={e => handleRawMaterialQty(e)}
                                      disabled
                                    />
                                  </Col>

                                  <Col sm={3} xs={5} className="mb-3">
                                    <Input
                                      type="number"
                                      id="price"
                                      className="form-control"
                                      placeholder="Enter Price"
                                      value={formRow.rawMaterialPrice}
                                      onChange={e => handleRawMaterialPrice(e)}
                                      disabled
                                    />
                                  </Col>

                                  <Col sm={2} xs={2}>
                                    {/* <div className="d-grid">
                                        <input
                                          type="button"
                                          className="btn btn-primary"
                                          value="Delete"
                                          onClick={() =>
                                            onDeleteFormRow(formRow.id)
                                          }
                                        />
                                      </div> */}
                                    <Link
                                      value="Delete"
                                      onClick={() =>
                                        onDeleteFormRow(formRow.id)
                                      }
                                      className="text-danger p-1 border-none"
                                    >
                                      <i
                                        className="bx bxs-trash"
                                        style={{
                                          padding: "5px",
                                          fontSize: "22px",
                                          lineHeight: "27px",
                                        }}
                                      />
                                    </Link>
                                  </Col>
                                </Row>
                              ))}
                            </div>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <hr style={{ borderTop: "1px solid #d5d5d5" }} />
                    <div className="actions clearfix">
                      <ul>
                        {activeTab === 2 && (
                          <li style={{ margin: "0 40px", fontWeight: "600" }}>
                            <span style={{ padding: "0 15px" }}>Total:</span>{" "}
                            <span>{totalPrice}</span>
                          </li>
                        )}
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        {activeTab !== 2 ? (
                          <li className="next">
                            <Link to="#" onClick={submitForm}>
                              Next
                            </Link>
                          </li>
                        ) : (
                          <li className="next">
                            <Button
                              onClick={submitAllForm}
                              disabled={formRows.length === 0}
                              style={
                                formRows.length !== 0
                                  ? {
                                      backgroundColor: "#FB940E",
                                      border: "none",
                                    }
                                  : { backgroundColor: "#fcb961" }
                              }
                            >
                              submit
                            </Button>
                          </li>
                        )}
                      </ul>
                    </div>
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

export default Purchase
