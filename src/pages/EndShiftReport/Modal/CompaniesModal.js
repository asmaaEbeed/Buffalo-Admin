import React from "react"
import { Modal, ModalHeader, ModalBody, Table, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

const CompaniesModal = ({ companyModal, handleCompanyToggle, compList }) => {
  const toggle = () => {
    handleCompanyToggle()
  }

  return (
    <Modal isOpen={companyModal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Total Companies
      </ModalHeader>
      <ModalBody>
        <div className="mx-auto">
          <SimpleBar
            style={{ maxHeight: "195px", width: "75%", margin: "0 auto" }}
          >
            <div className="table-responsive">
              <Table className="table table-nowrap align-middle table-hover mb-0">
                <thead>
                  <tr>
                    <td>Company Name</td>
                    <td>Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {(compList || []).map((comp, key) => (
                    <tr key={key}>
                      <td>
                        <h5 className="text-truncate font-size-14 mb-1">
                          {comp.name}
                        </h5>
                      </td>
                      <td>
                        <h5 className="text-truncate font-size-14 mb-1">
                          {comp.balance}
                        </h5>
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
            <div className="text-end mt-2">
              <button type="button" onClick={toggle} className="btn btn-success save-user">
                <i className="mdi mdi-check-circle-outline me-1" />
                Done
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default CompaniesModal
