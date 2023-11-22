import React, { useState } from "react"
import { Link } from "react-router-dom"

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
import SimpleBar from "simplebar-react"

import * as Yup from "yup"

const NotesModal = ({ noteModal, handleNotesToggle, tableRows, handleNotesList }) => {
  const [noteName, setNoteName] = useState("")
  // const [tableRows, setTableRows] = useState([
  //   { id: 1, noteName: "note 1" },
  //   { id: 2, noteName: "note 2" },
  // ])

  const toggle = () => {
    handleNotesToggle()
  }

  function handleRemoveRow(id) {
    var modifiedRows = [...tableRows]
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    // setTableRows(modifiedRows)
    handleNotesList(modifiedRows)
  }

  const addNoteToList = newNote => {
    const modifiedNoteList = [...tableRows]
    modifiedNoteList.push({ id: modifiedNoteList.length + 1, ...newNote })
    // setTableRows(modifiedNoteList)
    handleNotesList(modifiedNoteList)
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      noteName: noteName || "",
    },
    validationSchema: Yup.object({
      noteName: Yup.string().required("Please Enter Unit Name"),
    }),
    onSubmit: values => {
      const newNote = {
        noteName: values["noteName"],
      }
      // save new user
      //dispatch(onAddNewUser(newArea))
      console.log(newNote)
      addNoteToList(newNote)

      validation.resetForm()

      // toggle()
    },
  })

  return (
    <Modal isOpen={noteModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Add Notes
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
                <div className="input-group">
                  <div className="col-10">
                    <Input
                      name="noteName"
                      type="text"
                      placeholder="Enter notes ..."
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.noteName || ""}
                      invalid={
                        validation.touched.noteName &&
                        validation.errors.noteName
                          ? true
                          : false
                      }
                    ></Input>
                    {validation.touched.noteName &&
                    validation.errors.noteName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.noteName}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary w-100"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                  {validation.touched.unit && validation.errors.unit ? (
                    <FormFeedback type="invalid">
                      {validation.errors.unit}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
        </Form>

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
                          {tableRow.noteName}
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
      </ModalBody>
    </Modal>
  )
}

export default NotesModal
