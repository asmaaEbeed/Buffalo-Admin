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
} from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

const PrepareAreaModal = ({ prepareAreaModal, handlePrepareAreaToggle }) => {
  // const [modal, setModal] = useState(false);
  const [areaName, setAreaName] = useState("")

  const toggle = () => {
    handlePrepareAreaToggle();
  }

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      areaName: areaName || "",
    },
    validationSchema: Yup.object({
      areaName: Yup.string().required("Please Enter Area Name"),
    }),
    onSubmit: values => {
      const newArea = {
        areaName: values["areaName"],
      }
      // save new user
      //dispatch(onAddNewUser(newArea))

      validation.resetForm()

      toggle()
    },
  })

  return (
    <Modal isOpen={prepareAreaModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Area
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
                <Label className="form-label">Add Area name</Label>
                <Input
                  name="areaName"
                  type="text"
                  placeholder="Enter Area Name ..."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.areaName || ""}
                  invalid={
                    validation.touched.areaName && validation.errors.areaName
                      ? true
                      : false
                  }
                />
                {validation.touched.areaName && validation.errors.areaName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.areaName}
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

export default PrepareAreaModal
