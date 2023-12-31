import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AdminSideNavBar from "./AdminSideNavBar";
import { headers } from "./ApiHeader";

const SubTypes = ({ upd }) => {
  const [validated, setvalidated] = useState(false);
  const [LinkName, setName] = useState(upd != null ? upd.LinkName : "");
  const [SubmissionType, setType] = useState(
    upd != null ? upd.SubmissionType : ""
  );
  const [date, setDate] = useState(upd != null ? upd.date : "");
  const [Time, setTime] = useState(upd != null ? upd.Time : "");

  const disablePastDays = () => {
    const today = new Date();
    const dd = String(today.getDate());
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const onSubmit = (event) => {
    event.preventDefault(); // This stops the form from submitting
  
    const form = event.currentTarget;
  
    // If the form in general or LinkName specifically is not valid, stop here
    if (!form.checkValidity() || !linkNameRef.current.validity.valid) {
      event.stopPropagation();
      setvalidated(true); // Show validation errors
      return; // Stop here
    }
  
    // Construct the submission object
    const newSubType = {
      LinkName: LinkName,
      SubmissionType: SubmissionType,
      Date: date,
      Time: Time,
      Status: "No attempt",
    };
  
    // Continue with form submission if everything is valid
    if (upd == null) {
      axios
        .post("http://localhost:5000/subtype/add", newSubType)
        .then(() => alert("You posted a link"))
        .catch((err) => alert(err));
    } else {
      if (upd == null) {
        axios
          .post("https://localhost:5000/subtype/add", newSubType, {
            headers: headers,
          })
          .then(() => alert("You posted a link"))
          .catch((err) => alert(err));
        console.log(newSubType);
      } else {
        axios
          .put(`https://localhost:5000/subtype/update/${upd._id}`, newSubType, {
            headers: headers,
          })
          .then(() => alert("Link is Updated"))
          .catch((err) => alert(err));
      }
    }
    setvalidated(true);
  };
  
  const linkNameRef = useRef(null);

  return (
    <div
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/2624528.jpg")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <AdminSideNavBar />
      <div
        style={{
          marginLeft: "200px",
        }}
      >
        <Modal.Dialog className="cp6">
          <Modal.Header>
            <Modal.Title>Create Submission Types</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form noValidate validated={validated}>
              <Form.Group className="mb-3">
                <Form.Label>Submission Link Name</Form.Label>
                

<Form.Control
  ref={linkNameRef}
  type="text"
  placeholder="Enter name"
  pattern="^(?:\s*\b[A-Za-z]+\b\s*){0,5}$"
  value={LinkName}
  onChange={(e) => setName(e.target.value)}
  required
/>

                <Form.Control.Feedback type="invalid">
                  Enter Name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Submission Types</Form.Label>
                <Form.Select
                  value={SubmissionType}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="" selected disabled hidden>
                    Select
                  </option>
                  <option>Topic Assessment form</option>
                  <option>Proposal Document</option>
                  <option>Presentation slides</option>
                  <option>Final Thesis</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select One
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  min={disablePastDays()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Date
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Due Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Time"
                  value={Time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Time
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* <Button variant="primary" onClick={onSubmit}>
              {upd != null ? "Done" : "Submit"}
            </Button> */}
            <Button variant="primary" onClick={onSubmit} disabled={!LinkName || !SubmissionType || !date || !Time}>
  {upd != null ? "Done" : "Submit"}
</Button>

          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default SubTypes;
