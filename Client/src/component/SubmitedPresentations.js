import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { headers } from "./ApiHeader";

const SubmitedPresentations = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const getSubmissions = () => {
      axios
        .get("https://localhost:5000/submission", {
          headers: headers,
        })
        .then((res) => {
          setSubmissions(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getSubmissions();
  }, []);
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Download</th>
          </tr>
        </thead>
        {submissions
          .filter((subType) => subType.subType === "Presentation slides")
          .map((submission) => (
            <tbody key={submission._id}>
              <tr>
                <td>{submission.groupId}</td>
                <td>
                  <a href={submission.file}>
                    <Button variant="primary">Download</Button>
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};

export default SubmitedPresentations;
