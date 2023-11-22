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
import MaterialModal from "./MaterialModal"
import ComponentModal from "./ComponentModal"

const IngrediantModal = ({ ingrediantModal, handleIngrediantToggle, tableRows, handleIngrediantsList }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [selectedComponent, setSelectedComponent] = useState("")
  const [materialQuantity, setMaterialQty] = useState(0)
  const [componentQuantity, setComponentQuantity] = useState(0)

  const [materialModal, setMaterialModal] = useState(false)
  const [componentModal, setComponentModal] = useState(false)

  const handleMaterialModal = () => {
    setMaterialModal(true)
  }

  const handleMaterialToggle = () => {
    setMaterialModal(!materialModal)
  }

  const handleComponentModal = () => {
    setComponentModal(true)
  }
  const handleComponentToggle = () => {
    setComponentModal(!componentModal)
  }

  // List of Ingrediants
  // const [tableRows, setTableRows] = useState([
  //   { id: 1, ingredName: "Ingred1", ingredQty: 5 },
  //   { id: 2, ingredName: "Ingred2", ingredQty: 10 },
  // ])

  function handleRemoveRow(id) {
    var modifiedRows = [...tableRows]
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    handleIngrediantsList(modifiedRows)
    // setTableRows(modifiedRows)
  }

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

  const componentOptionGroup = [
    {
      label: "Component",
      options: [
        { label: "Mayonize", value: "Mayonize" },
        { label: "Chicken", value: "Chicken" },
        { label: "Smoked Beef", value: "SmokedBeef" },
      ],
    },
  ]

  const toggle = () => {
    handleIngrediantToggle()
  }

  const addMaterialToList = newMaterial => {
    const modifiedIngList = [...tableRows]
    modifiedIngList.push({ id: modifiedIngList.length + 1, ...newMaterial })
    console.log(modifiedIngList)
    // setTableRows(modifiedIngList)
    handleIngrediantsList(modifiedIngList)
  }

  // validation
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

      // toggle()
      console.log(materialValidation.touched.selectedMaterial)
    },
  })

  const componentValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      selectedComponent: selectedComponent || "",
      componentQuantity: componentQuantity || "",
    },
    validationSchema: Yup.object({
      selectedComponent: Yup.string().required("Please Select Material"),
      componentQuantity: Yup.number().required("Please Enter Quantity"),
    }),
    onSubmit: values => {
      const newMaterial = {
        ingredName: values["selectedComponent"],
        ingredQty: values["componentQuantity"],
      }
      // save new user
      //dispatch(onAddNewUser(newMaterial))
      addMaterialToList(newMaterial)
      componentValidation.resetForm()

      // toggle()
    },
  })

  function handleSelectMaterial(selectedMaterial) {
    setSelectedMaterial(selectedMaterial.value)
  }

  function handleSelectedComponent(e) {
    setSelectedComponent(e.value)
    console.log(selectedComponent)
  }

  return (
    <Modal isOpen={ingrediantModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Ingrediants
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={e => {
            e.preventDefault()
            materialValidation.handleSubmit()
            return false
          }}
        >
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
                  <button className="btn btn-primary mx-1" type="submit">
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
        </Form>

        <Form
          onSubmit={e => {
            e.preventDefault()
            componentValidation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <Label>Component</Label>
                <div className="input-group">
                  <Select
                    value={componentOptionGroup.find(function (option) {
                      return option.value === selectedComponent
                    })}
                    onChange={e => {
                      handleSelectedComponent(e)
                    }}
                    options={componentOptionGroup}
                    className={`select2-selection form-control ${classes.input_with_btn}`}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    id="inputGroupFileAddon04"
                    onClick={handleComponentModal}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className="mb-3">
                <Label className="form-label">Quantity</Label>
                <div className="input-group">
                  <Input
                    name="componentQuantity"
                    type="number"
                    placeholder="0"
                    onChange={(e)=>setComponentQuantity(e.target.value)}
                    onBlur={componentValidation.handleBlur}
                    value={componentValidation.values.componentQuantity || ""}
                    invalid={
                      componentValidation.touched.componentQuantity &&
                      componentValidation.errors.componentQuantity
                        ? true
                        : false
                    }
                  />
                  <button className="btn btn-primary mx-1" type="submit">
                    <i className="mdi mdi-plus-circle-outline me-1" />
                    Add Ingrediant
                  </button>
                  {componentValidation.touched.componentQuantity &&
                  componentValidation.errors.componentQuantity ? (
                    <FormFeedback type="invalid">
                      {componentValidation.errors.componentQuantity}
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
                <button
                  type="button"
                  className="btn btn-success save-user"
                  onClick={toggle}
                >
                  <i className="mdi mdi-arrow-left-circle me-1" />
                  back
                </button>
              </div>
            </Col>
          </Row>
        </Form>
        <ComponentModal
          componentModal={componentModal}
          handleComponentToggle={handleComponentToggle}
        />
        <MaterialModal
          materialModal={materialModal}
          handleMaterialToggle={handleMaterialToggle}
        />
      </ModalBody>
    </Modal>
  )
}

export default IngrediantModal
