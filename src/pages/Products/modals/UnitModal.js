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
  Button
} from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"


const UnitModal = ({unitModal, handleUnitToggle}) => {
    const [unitName, setUnitName] = useState("");

    const toggle = () => {
        handleUnitToggle()
      }

      

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          unitName: unitName || ""
        },
        validationSchema: Yup.object({
            unitName: Yup.string().required("Please Enter Unit Name")
        }),
        onSubmit: values => {
          const newUnit = {
            unitName: values["unitName"]
          }
          // save new user
          //dispatch(onAddNewUser(newArea))
          console.log(newUnit)
          validation.resetForm()
    
          toggle()
        },
      })

      const resetUnitForm = () => {
        setUnitName("")
      }
      const handleCancel = () => {
        console.log('x')
          resetUnitForm();
          console.log(unitName);
          toggle();
      }

  return (
    <Modal isOpen={unitModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Unit
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
                <Label className="form-label">Unit</Label>
                <Input
                  name="unitName"
                  type="text"
                  placeholder="Enter unit ..."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.unitName || ""}
                  invalid={
                    validation.touched.unitName &&
                    validation.errors.unitName
                      ? true
                      : false
                  }
                />
                {validation.touched.unitName &&
                validation.errors.unitName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.unitName}
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

export default UnitModal
