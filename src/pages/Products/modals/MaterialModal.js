import React, { useState } from "react"

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
  FormGroup,
  Button,
} from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import UnitModal from "./UnitModal"

const MaterialModal = ({ handleMaterialToggle, materialModal }) => {
  const [materialName, setMaterialName] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")
  const [minOrder, setMinOrder] = useState(0)
  const [unitList, setUnitList] = useState([
    { id: 1, label: "unit1", value: "unit1" },
    { id: 2, label: "unit2", value: "unit2" },
  ])

  const [unitModal, setUnitModal] = useState(false)

  const toggle = () => {
    handleMaterialToggle()
  }

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      materialName: materialName || "",
      selectedUnit: selectedUnit || "",
      minOrder: minOrder || "",
    },
    validationSchema: Yup.object({
      materialName: Yup.string().required("Please Enter Material Name"),
      selectedUnit: Yup.string().required("Please select unit"),
      minOrder: Yup.number().required("Please enter min. order"),
    }),
    onSubmit: values => {
      const newMaterial = {
        materialName: values["materialName"],
        selectedUnit: values["selectedUnit"],
        minOrder: values["minOrder"],
      }
      // save new user
      //dispatch(onAddNewUser(newArea))
      console.log(newMaterial)
      setSelectedUnit("")
      validation.resetForm()

      // toggle()
    },
  })

  const resetForm = () => {
    setSelectedUnit("")
    setMinOrder("")
    setMaterialName("")
  }
  const handleCancel = () => {
    resetForm()
    toggle()
  }
  const handleSelectUnit = e => {
    console.log(e.target.value)
    setSelectedUnit(e.target.value)
  }

  const handleUnitModal = () => {
    console.log("cluck")
    setUnitModal(true)
  }

  const handleUnitToggle = () => {
    setUnitModal(!unitModal)
  }

  return (
    <Modal isOpen={materialModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Material
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
            <Col xs={12}>
              <div className="mb-3">
                <Label className="form-label">Raw Material</Label>
                <Input
                  name="materialName"
                  type="text"
                  placeholder="Enter Raw Material ..."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.materialName || ""}
                  invalid={
                    validation.touched.materialName &&
                    validation.errors.materialName
                      ? true
                      : false
                  }
                />
                {validation.touched.materialName &&
                validation.errors.materialName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.materialName}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <label className="form-label">Default Unit</label>
              <div className="input-group">
                <Col xs={10}>
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
                </Col>
                <Col xs={2}>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleUnitModal}
                >
                  Add
                </button>
                </Col>
                

                {validation.touched.unit && validation.errors.unit ? (
                  <FormFeedback type="invalid">
                    {validation.errors.unit}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-3">
                <Label className="form-label">Minimum Order</Label>
                <div className="input-group">
                  <Input
                    name="minOrder"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.minOrder || ""}
                    invalid={
                      validation.touched.minOrder && validation.errors.minOrder
                        ? true
                        : false
                    }
                  />
                  {validation.touched.minOrder && validation.errors.minOrder ? (
                    <FormFeedback type="invalid">
                      {validation.errors.minOrder}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
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
      </ModalBody>
    </Modal>
  )
}

export default MaterialModal
