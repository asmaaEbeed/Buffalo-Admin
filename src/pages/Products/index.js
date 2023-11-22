import React, { useEffect, useState, useRef, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  Button,
} from "reactstrap"
import Dropzone from "react-dropzone"
import Select from "react-select"
import * as Yup from "yup"
import { useFormik } from "formik"

import {
  Name,
  Category,
  Tags,
  Price,
  SecondName,
  PrepareArea,
} from "./contactlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

import classes from "./index.module.scss"
import PrepareAreaModal from "./modals/PrepareAreaModal"
import IngrediantModal from "./modals/IngrediantModal"
import NotesModal from "./modals/NotesModal"
import MainCategoryModal from "./modals/MainCategoryModal"
import SubCategoryModal from "./modals/SubCategoryModal"

const Products = props => {
  //meta title
  document.title = "Products List | Buffalo - Admin"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      secondName: (contact && contact.secondName) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
      price: (contact && contact.price) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      secondName: Yup.string().required("Please Enter second language name."),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      projects: Yup.string().required("Please Enter Your Project"),
      price: Yup.string()
        .matches(/^\d+$/, "The field should have digits only")
        .required("Please Enter Price"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          secondName: values.secondName,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        }
        // update user
        dispatch(onUpdateUser(updateUser))
        setIsEdit(false)
        validation.resetForm()
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          secondName: values["secondName"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        }
        // save new user
        dispatch(onAddNewUser(newUser))
        validation.resetForm()
      }
      toggle()
    },
  })

  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }))

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // added by asmaa ebeed
  const [selectedGroup, setselectedGroup] = useState(null)

  const optionGroup = [
    { label: "Mustard", value: "Mustard" },
    { label: "Ketchup", value: "Ketchup" },
    { label: "Relish", value: "Relish" },
  ]

   const [mainCategoryList, setMainCategoryList] = useState([
    { id: 1, label: "Main Category 1", value: "Main Category 1" },
    { id: 2, label: "Main Category 2", value: "Main Category 2" },
    { id: 3, label: "Main Category 3", value: "Main Category 3" },
  ])

  const [notesList, setNotesList] = useState([
    { id: 1, noteName: "note 1" },
    { id: 2, noteName: "note 2" },
  ])

  // List of Ingrediants
  const [ingrediantList, setIngrediantList] = useState([
    { id: 1, ingredName: "Ingred1", ingredQty: 5 },
    { id: 2, ingredName: "Ingred2", ingredQty: 10 },
  ])

  const handleNotesList = newList => {
    setNotesList(newList)
  }
  const handleIngrediantsList = (newList) => {
    setIngrediantList(newList)
  }

  const handleAddMainCatList =(newItem) => {
    console.log(newItem)
    setMainCategoryList((prevState) => [...prevState, newItem])
  }

  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" className="form-check-input" />;
      //   },
      // },
      {
        Header: "Img",
        // accessor: "img",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.img}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Item Name “1st Lang”",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Item Name “2nd Lang”",
        accessor: "secondName",
        filterable: true,
        Cell: cellProps => {
          return <SecondName {...cellProps} />
        },
      },
      {
        Header: "Prepare Area",
        accessor: "prepareArea",
        filterable: true,
        Cell: cellProps => {
          return <PrepareArea {...cellProps} />
        },
      },
      {
        Header: "Category",
        accessor: "category",
        filterable: true,
        Cell: cellProps => {
          return <Category {...cellProps} />
        },
      },
      {
        Header: "Notes",
        accessor: "notes",
        filterable: true,
        Cell: cellProps => {
          return <Tags {...cellProps} />
        },
      },
      {
        Header: "Ingrediants",
        accessor: "tags",
        filterable: true,
        Cell: cellProps => {
          return <Tags {...cellProps} />
        },
      },
      {
        Header: "Price",
        accessor: "projects",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Price {...cellProps} />{" "}
            </>
          )
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    console.log(users)
    console.log(users.length)
    setContact(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setContact({
      id: user.id,
      name: user.name,
      secondName: user.secondName,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id))
    }
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setUserList("")
    setIsEdit(false)
    toggle()
  }

  // Added by Asmaa
  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

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

  // PrepareAreaModel Added by Asmaa
  const [prepareAreaModal, setPrepareAreaModal] = useState(false)

  const handlePrepareAreaModal = () => {
    setPrepareAreaModal(true)
  }

  const handlePrepareAreaToggle = () => {
    setPrepareAreaModal(!prepareAreaModal)
  }

  const [ingrediantModal, setIngrediantModal] = useState(false)

  const handleIngrediantModal = () => {
    setIngrediantModal(true)
  }

  const handleIngrediantToggle = () => {
    setIngrediantModal(!ingrediantModal)
  }

  const [noteModal, setNoteModal] = useState(false)

  const handleNoteModal = () => {
    setNoteModal(true)
  }

  const handleNotesToggle = () => {
    setNoteModal(!noteModal)
  }

  const [mainCategoryModal, setMainCategoryModal] = useState(false)

  const handleMainCategoryModal = () => {
    setMainCategoryModal(true)
  }

  const handleMainCategoryToggle = () => {
    setMainCategoryModal(!mainCategoryModal)
  }

  const [subCategoryModal, setSubCategoryModal] = useState(false)

  const handleSubCategoryModal = () => {
    setSubCategoryModal(true)
  }

  const handleSubCategoryToggle = () => {
    setSubCategoryModal(!subCategoryModal)
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Products" breadcrumbItem="Product List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={5}
                    allListSize={users.length}
                    newItemBtnTxt="Create New Product"
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle} size="lg">
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Product" : "Add Product"}
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
                            <Row>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label className="form-label">
                                    Item Name “First Lang”
                                  </Label>
                                  <Input
                                    name="name"
                                    type="text"
                                    placeholder="First Lang Name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                    invalid={
                                      validation.touched.name &&
                                      validation.errors.name
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.name &&
                                  validation.errors.name ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.name}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label className="form-label">
                                    Item Name “Second Lang”
                                  </Label>
                                  <Input
                                    name="secondName"
                                    type="text"
                                    placeholder="second Lang Name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.secondName || ""}
                                    invalid={
                                      validation.touched.secondName &&
                                      validation.errors.secondName
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.secondName &&
                                  validation.errors.secondName ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.secondName}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label>Main Category</Label>
                                  <div className="input-group">
                                    <Select
                                      value={selectedGroup}
                                      onChange={() => {
                                        handleSelectGroup()
                                      }}
                                      options={mainCategoryList}
                                      className={`select2-selection form-control ${classes.input_with_btn}`}
                                    />
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      id="inputGroupFileAddon04"
                                      onClick={handleMainCategoryModal}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label>Sub Category</Label>
                                  <div className="input-group">
                                    <Select
                                      value={selectedGroup}
                                      onChange={() => {
                                        handleSelectGroup()
                                      }}
                                      options={optionGroup}
                                      className={`select2-selection form-control ${classes.input_with_btn}`}
                                    />
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      id="inputGroupFileAddon04"
                                      onClick={handleSubCategoryModal}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label>Prepare Area</Label>
                                  <div className="input-group">
                                    <Select
                                      value={selectedGroup}
                                      onChange={() => {
                                        handleSelectGroup()
                                      }}
                                      options={optionGroup}
                                      className={`select2-selection form-control ${classes.input_with_btn}`}
                                    />
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      onClick={handlePrepareAreaModal}
                                      id="inputGroupFileAddon04"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label className="form-label">Price</Label>
                                  <Input
                                    name="price"
                                    type="text"
                                    placeholder="Price"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.price || ""}
                                    invalid={
                                      validation.touched.price &&
                                      validation.errors.price
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.price &&
                                  validation.errors.price ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.price}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label className="form-label">Notes</Label>
                                  <Input
                                    disabled={true}
                                    type="select"
                                    name="tags"
                                    className="form-select"
                                    multiple={true}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.tags || []}
                                    invalid={
                                      validation.touched.tags &&
                                      validation.errors.tags
                                        ? true
                                        : false
                                    }
                                  >
                                    {notesList.map(note => (
                                      <option key={note.id}>
                                        {note.noteName}
                                      </option>
                                    ))}
                                  </Input>
                                  {validation.touched.tags &&
                                  validation.errors.tags ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.tags}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                                <div className="d-flex justify-content-end">
                                  <Button
                                    color="warning"
                                    outline
                                    className="justify-content-end"
                                    type="button"
                                    onClick={handleNoteModal}
                                  >
                                    Add Notes
                                  </Button>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Label className="form-label">
                                    Ingrediants
                                  </Label>
                                  <Input
                                    disabled={true}
                                    type="select"
                                    name="tags"
                                    className="form-select"
                                    multiple={true}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.tags || []}
                                    invalid={
                                      validation.touched.tags &&
                                      validation.errors.tags
                                        ? true
                                        : false
                                    }
                                  >
                                    {ingrediantList.map(ingred=><option key={ingred.id}>{ingred.ingredName}</option>)}
                                    
                                  </Input>
                                  {validation.touched.tags &&
                                  validation.errors.tags ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.tags}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                                <div className="d-flex justify-content-end">
                                  <Button
                                    color="warning"
                                    outline
                                    className="justify-content-end"
                                    onClick={handleIngrediantModal}
                                    type="button"
                                  >
                                    Add Ingrediants
                                  </Button>
                                </div>
                              </Col>
                            </Row>
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
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                  <PrepareAreaModal
                    prepareAreaModal={prepareAreaModal}
                    handlePrepareAreaToggle={handlePrepareAreaToggle}
                  />
                  <IngrediantModal
                    ingrediantModal={ingrediantModal}
                    handleIngrediantToggle={handleIngrediantToggle}
                    handleIngrediantsList={handleIngrediantsList}
                    tableRows={ingrediantList}
                  />
                  <NotesModal
                    noteModal={noteModal}
                    handleNotesToggle={handleNotesToggle}
                    tableRows={notesList}
                    handleNotesList={handleNotesList}
                  />
                  <MainCategoryModal
                    mainCategoryModal={mainCategoryModal}
                    handleMainCategoryToggle={handleMainCategoryToggle}
                    handleMainCatList={handleAddMainCatList}
                  />
                  <SubCategoryModal
                    subCategoryModal={subCategoryModal}
                    handleSubCategoryToggle={handleSubCategoryToggle}
                    mainCatElement={optionGroup}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Products)
