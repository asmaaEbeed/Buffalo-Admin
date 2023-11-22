import React, { useState } from "react"
import Select from "react-select"

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  Button,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"

import { useFormik } from "formik"
import * as Yup from "yup"
import SimpleBar from "simplebar-react"
import classes from "../index.module.scss"
import UnitModal from "./UnitModal"
import MaterialModal from "./MaterialModal"

const ComponentModal = ({ componentModal, handleComponentToggle }) => {
  const [componentName, setComponentName] = useState("")
  const [componentQty, setComponentQty] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState("")
  const [unitList, setUnitList] = useState([
    { id: 1, label: "unit1", value: "unit1" },
    { id: 2, label: "unit2", value: "unit2" },
  ])

  const materialOptionGroup = [
    {
      label: "Material",
      options: [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
      ],
    },
  ]

  const [unitModal, setUnitModal] = useState(false)
  const [materialQuantity, setMaterialQty] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [materialModal, setMaterialModal] = useState(false)

  // List of Ingrediants
  const [tableRows, setTableRows] = useState([
    { id: 1, ingredName: "Ingred1", ingredQty: 5 },
    { id: 2, ingredName: "Ingred2", ingredQty: 10 },
  ])
  const [oldTableRow, setOldTableRow] = useState([])

  function handleRemoveRow(id) {
    var modifiedRows = [...tableRows]
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    setTableRows(modifiedRows)
  }

  const toggle = () => {
    handleComponentToggle()
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      componentName: componentName || "",
      componentQty: componentQty || "",
      selectedUnit: selectedUnit || "",
    },
    validationSchema: Yup.object({
      componentName: Yup.string().required("Please Enter Component Name"),
      componentQty: Yup.string().required("Please Enter Component Qty"),
      selectedUnit: Yup.string().required("Please select unit"),
    }),
    onSubmit: values => {
      const newComponent = {
        componentName: values["componentName"],
        selectedUnit: values["selectedUnit"],
        componentQty: values["componentQty"],
      }
      // save new user
      //dispatch(onAddNewUser(newArea))
      console.log(newComponent)
      validation.resetForm()

      toggle()
    },
  })

  const materialValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      selectedMaterial: selectedMaterial || "",
      materialQuantity: materialQuantity || "",
    },
    validationSchema: Yup.object({
      selectedMaterial: Yup.string().required("Please Select Material"),
      materialQuantity: Yup.number().required(
        "Please enter material quantity."
      ),
    }),
    onSubmit: values => {
      const newMaterial = {
        ingredName: values["selectedMaterial"],
        ingredQty: values["materialQuantity"],
      }
      // save new user
      //dispatch(onAddNewUser(newMaterial))
      addMaterialToList(newMaterial)
      materialValidation.resetForm()
      // setResetMaterialValue(false)
      setSelectedMaterial("")

      // toggle()
      console.log(materialValidation.touched.selectedMaterial)
    },
  })

  const resetForm = () => {
    setSelectedMaterial("");
    setMaterialQty("");
  }
 
  const handleSelectUnit = e => {
    console.log(e.target.value)
    setSelectedUnit(e.target.value)
  }

  const handleCancel = () => {
    resetForm();
    setTableRows(oldTableRow);
    validation.resetForm()
    toggle()
  }

  const handleUnitModal = () => {
    console.log("cluck")
    setUnitModal(true)
  }
  const handleUnitToggle = () => {
    setUnitModal(!unitModal)
  }

  function handleSelectMaterial(selectedMaterial) {
    setSelectedMaterial(selectedMaterial.value)
  }

  const handleMaterialModal = () => {
    setMaterialModal(true)
  }

  const handleMaterialToggle = () => {
    setMaterialModal(!materialModal)
  }

  const addMaterialToList = (newMaterial) => {
    setOldTableRow(tableRows)
    const modifiedIngList = [...tableRows]
    modifiedIngList.push({ id: modifiedIngList.length + 1, ...newMaterial });
    console.log(modifiedIngList)
    setTableRows(modifiedIngList);
  }

  return (
    <Modal isOpen={componentModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Components
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col xs={6}>
              <div className="mb-3">
                <Label>Component</Label>
                <Input
                  name="componentName"
                  type="text"
                  placeholder="Enter component name.."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.componentName || ""}
                  invalid={
                    validation.touched.componentName &&
                    validation.errors.componentName
                      ? true
                      : false
                  }
                />
                {validation.touched.componentName &&
                validation.errors.componentName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.componentName}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col xs={6}>
              <div className="mb-3">
                <Label className="form-label">Quantity</Label>
                <Input
                  name="componentQty"
                  type="number"
                  placeholder="0"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.componentQty || ""}
                  invalid={
                    validation.touched.componentQty &&
                    validation.errors.componentQty
                      ? true
                      : false
                  }
                />
                {validation.touched.componentQty &&
                validation.errors.componentQty ? (
                  <FormFeedback type="invalid">
                    {validation.errors.componentQty}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="mb-3">
                <label className="form-label">Default Unit</label>
                <div className="input-group">
                  <div className="col-10">
                    <Input
                      name="selectedUnit"
                      type="select"
                      onChange={e => {
                        validation.handleChange
                        handleSelectUnit(e)
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values.selectedUnit || ""}
                      invalid={
                        validation.touched.unit && validation.errors.unit
                          ? true
                          : false
                      }
                    >
                      <option value="">Select</option>
                      {unitList.map((unit, index) => (
                        <option key={index} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </Input>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary w-100"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      type="button"
                      onClick={handleUnitModal}
                    >
                      Add
                    </button>
                  </div>
                  {validation.touched.selectedUnit && validation.errors.selectedUnit ? (
                    <FormFeedback type="invalid">
                      {validation.errors.selectedUnit}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <Label>Material</Label>
                <div className="input-group">
                  <Select
                    value={materialOptionGroup.find(function (option) {
                      return option.value === selectedMaterial
                    })}
                    onChange={e => {
                      materialValidation.handleChange
                      handleSelectMaterial(e)
                    }}
                    onBlur={materialValidation.handleBlur}
                    options={materialOptionGroup}
                    className={`select2-selection form-control ${classes.input_with_btn} select-material`}
                    invalid={
                      materialValidation.touched.selectedMaterial &&
                      materialValidation.errors.selectedMaterial
                        ? true
                        : false
                    }
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleMaterialModal}
                  >
                    Add
                  </button>
                  {materialValidation.touched.selectedMaterial &&
                  materialValidation.errors.selectedMaterial ? (
                    <FormFeedback type="invalid">
                      {materialValidation.errors.selectedMaterial}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>

            <Col xs={6}>
              <div className="mb-3">
                <Label className="form-label">Quantity</Label>
                <div className="input-group">
                  <Input
                    name="materialQuantity"
                    type="number"
                    placeholder="0"
                    onChange={materialValidation.handleChange}
                    onBlur={materialValidation.handleBlur}
                    value={materialValidation.values.materialQuantity || ""}
                    invalid={
                      materialValidation.touched.materialQuantity &&
                      materialValidation.errors.materialQuantity
                        ? true
                        : false
                    }
                  />
                  <button
                    className="btn btn-primary mx-1"
                    onClick={e => {
                      e.preventDefault()
                      materialValidation.handleSubmit()
                      return false
                    }}
                    type="button"
                  >
                    <i className="mdi mdi-plus-circle-outline me-1" />
                    Add Ingrediant
                  </button>
                  {materialValidation.touched.materialQuantity &&
                  materialValidation.errors.materialQuantity ? (
                    <FormFeedback type="invalid">
                      {materialValidation.errors.materialQuantity}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-4 mx-auto">
            <SimpleBar
              style={{ maxHeight: "195px", width: "75%", margin: "0 auto" }}
            >
              <div className="table-responsive">
                <Table className="table table-nowrap align-middle table-hover mb-0">
                  <tbody>
                    {(tableRows || []).map((tableRow, key) => (
                      <tr key={key}>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            {tableRow.ingredName}
                          </h5>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            {tableRow.ingredQty}
                          </h5>
                        </td>
                        <td style={{ width: "90px" }}>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link
                                  onClick={() => handleRemoveRow(tableRow.id)}
                                  className="text-danger p-1 border-none"
                                >
                                  <i className="bx bxs-trash" />
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

          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  <i className="mdi mdi-check-circle-outline me-1" />
                  Save
                </button>
                <Button
                  type="button"
                  color="secondary"
                  className="mx-1"
                  onClick={handleCancel}
                >
                  <i className="mdi mdi-cancel me-1" />
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <UnitModal unitModal={unitModal} handleUnitToggle={handleUnitToggle} />
        <MaterialModal
          materialModal={materialModal}
          handleMaterialToggle={handleMaterialToggle}
        />
      </ModalBody>
    </Modal>
  )
}

export default ComponentModal
