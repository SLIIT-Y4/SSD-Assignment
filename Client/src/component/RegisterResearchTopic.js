import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import StudentSideNavBar from "./StudentSideNavBar";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { headers } from "./ApiHeader";

const RegisterResearchTopic = () => {
  const [validated, setvalidated] = useState(false);
  const [gid, setGroupId] = useState("");
  const [gname, setGroupName] = useState("");
  const [topic, setResearchTopic] = useState("");
  const [supname, setSupName] = useState("");
  const [cosupname, setCoSupName] = useState("");

  const checkSubmit = (event) => {
    const newRegTopic = {
      groupID: gid,
      groupName: gname,
      topic: topic,
      supervisorName: supname,
      cosupervisorName: cosupname,
      status: "Pending",
    };

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      axios
        .post("https://localhost:5000/topic/add", newRegTopic, {
          headers: headersers,
        })
        .then(
          () => swal("Success!", "Details Submitted Successfully!", "success"),
          navigate("/studentsub")
        )
        .catch((err) => swal("Failed!", "Something Went Wrong!", "error"));
    }
    setvalidated(true);
  };

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url("https://foundation.caionline.org/wp-content/uploads/2017/06/research.jpg")`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <StudentSideNavBar />
      <div style={{ marginLeft: "200px" }}>
        <center>
          <h2>Register Research Topic</h2>
        </center>

        <div className="topicregform">
          <Form noValidate validated={validated} onSubmit={checkSubmit}>
            <Form.Group className="mb-3" controlId="gid">
              <Form.Label>Group ID</Form.Label>
              <Form.Control
                placeholder="Format: SD1234"
                pattern="[A-Z]{2}\d{4}"
                value={gid}
                onChange={(e) => setGroupId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="gname">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                placeholder="Maximum 5 words."
                pattern="^(?:\s*\b[A-Za-z]+\b\s*){0,5}$"
                value={gname}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="supname">
              <Form.Label>Supervisor Name</Form.Label>
              <Form.Control
                placeholder="Supervisor Name"
                pattern="^(?:\s*\b[A-Za-z]+\b\s*){0,5}$"
                value={supname}
                onChange={(e) => setSupName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cosupname">
              <Form.Label>Co-supervisor Name</Form.Label>
              <Form.Control
                placeholder="Co-supervisor Name"
                pattern="^(?:\s*\b[A-Za-z]+\b\s*){0,5}$"
                value={cosupname}
                onChange={(e) => setCoSupName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="topic">
              <Form.Label>Research Topic</Form.Label>
              <Form.Control
                placeholder="Research Topic"
                pattern="^(?:\s*\b[A-Za-z]+\b\s*){0,10}$"
                value={topic}
                onChange={(e) => setResearchTopic(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <br />
      </div>
    </div>
  );
};

export default RegisterResearchTopic;
