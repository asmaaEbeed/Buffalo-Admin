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
  Table
} from "reactstrap"
import { useFormik } from "formik"

import * as Yup from "yup"


const MainCategoryModal = ({mainCategoryModal, handleMainCategoryToggle, handleMainCatList}) => {

    const [mainCatName, setMainCatName] = useState("")

    const toggle = () => {
        handleMainCategoryToggle();
      }
    
      // validation
      const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          mainCatName: mainCatName || "",
        },
        validationSchema: Yup.object({
            mainCatName: Yup.string().required("Please Enter Main Category"),
        }),
        onSubmit: values => {
          const newMainCat = {
            mainCatName: values["mainCatName"],
          }
          // save new user
          //dispatch(onAddNewUser(newArea))
          handleMainCatList({id: newMainCat.mainCatName, label: newMainCat.mainCatName, value: newMainCat.mainCatName})
    
          validation.resetForm()
    
          toggle()
        },
      })
    
  return (
    <Modal isOpen={mainCategoryModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Main Category
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
                <Label className="form-label">Add Main Category</Label>
                <Input
                  name="mainCatName"
                  type="text"
                  value={validation.values.mainCatName || ""}
                  invalid={
                    validation.touched.mainCatName && validation.errors.mainCatName
                    ? true
                      : false
                    }
                    placeholder="Enter Main Category Name ..."
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                />
                {validation.touched.mainCatName && validation.errors.mainCatName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mainCatName}
                  </FormFeedback>
                ) : null}
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
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default MainCategoryModal
