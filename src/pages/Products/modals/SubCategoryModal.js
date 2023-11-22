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
  Button,
} from "reactstrap"
import classes from "../index.module.scss"
import { useFormik } from "formik"
import Select from "react-select"

import * as Yup from "yup"

const SubCategoryModal = ({
  subCategoryModal,
  handleSubCategoryToggle,
  mainCatElement,
}) => {
  const [subCatName, setSubCatName] = useState("")
  const [selectedMainCat, setSelectedMainCat] = useState(null)

  const toggle = () => {
    handleSubCategoryToggle()
  }

  function handleSelectedMainCat(selectedMainCat) {
    setSelectedMainCat(selectedMainCat.value)
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      selectedMainCat: selectedMainCat || "",
      subCatName: subCatName || "",
    },
    validationSchema: Yup.object({
      selectedMainCat: Yup.string().required("Please Enter Main Category."),
      subCatName: Yup.string().required("Please Enter Sub-Category."),
    }),
    onSubmit: values => {
      const newSubCat = {
        selectedMainCat: values["selectedMainCat"],
        subCatName: values["subCatName"],
      }
      // save new user
      //dispatch(onAddNewUser(newArea))

      console.log(newSubCat);

      validation.resetForm()

      toggle()
    },
  })

  const resetSubCatForm = () => {
    setSelectedMainCat("")
    validation.resetForm()
    setSubCatName("")
  }

  const handleCancel = () => {
      resetSubCatForm();
      toggle();
  }

  return (
    <Modal isOpen={subCategoryModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Sub-Category
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
            <Col sm={12}>
              <div className="mb-3">
                <Label>Main Category</Label>
                <div className="input-group">
                  <Select
                    value={mainCatElement.find(function (option) {
                      return option.value === selectedMainCat
                    })}
                    onChange={e => {
                      validation.handleChange
                      handleSelectedMainCat(e)
                    }}
                    onBlur={validation.handleBlur}
                    options={mainCatElement}
                    className={`select2-selection form-control ${classes.input_with_btn} select-material`}
                    invalid={
                      validation.touched.selectedMaterial &&
                      validation.errors.selectedMaterial
                        ? true
                        : false
                    }
                  />

                  {validation.touched.selectedMaterial &&
                  validation.errors.selectedMaterial ? (
                    <FormFeedback type="invalid">
                      {validation.errors.selectedMainCat}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col sm={12}>
              <Row>
                <Col xs={12}>
                  <div className="mb-3">
                    <Label className="form-label">Main Category</Label>
                    <Input
                      name="subCatName"
                      type="text"
                      value={validation.values.subCatName || ""}
                      invalid={
                        validation.touched.subCatName &&
                        validation.errors.subCatName
                          ? true
                          : false
                      }
                      placeholder="Enter Sub-Category Name ..."
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                    />
                    {validation.touched.subCatName &&
                    validation.errors.subCatName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.subCatName}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  <i className="mdi mdi-check-circle-outline me-1" />
                  Save
                </button>
                <Button type="button" color="secondary" className="mx-1" onClick={handleCancel}>
                  <i className="mdi mdi-cancel me-1" />

                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default SubCategoryModal
