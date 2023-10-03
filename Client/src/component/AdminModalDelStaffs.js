import Modal from "react-bootstrap/Modal";
import { ModalBody, ModalFooter } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import swal from "sweetalert";

import axios from "axios";
import { headers } from "./ApiHeader";

const ModleStaffDelete = (props) => {
  const deleteStaff = () => {
    axios
      .delete(
        `https://localhost:5000/staff/delete/${props.deleteAdminStaffView._id}`,
        {
          headers: headers,
        }
      )
      .then(() => {
        swal("Deleted!", "Successfully Deleted", "success");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete a Staff member</Modal.Title>
      </Modal.Header>
      <ModalBody>
        Are you sure,do you want to delete this record.
        <br />
      </ModalBody>
      <ModalFooter>
        <Button onClick={deleteStaff} variant="danger">
          Delete
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModleStaffDelete;
