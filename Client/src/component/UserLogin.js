
import { useState, useEffect } from "react";
import UserModalSignup from "./UserModalSignup";
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import bcrypt from "bcryptjs";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [Modalsignup, setModalsignup] = useState("");
    const [isLoginDisabled, setIsLoginDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300);
    const [isCountingDown, setIsCountingDown] = useState(false);



    const navigate1 = useNavigate();
    const navigate = (type) => {
      if (type == "Student") {
        navigate1("/");
      } else if (type == "Staff") {
        navigate1("/");
      } else if (type == "Admin") {
        navigate1("/");
      }
    };


    useEffect(() => {
      let timer;
      if (isCountingDown) {
          timer = setInterval(() => {
              setRemainingTime(prevTime => {
                  if (prevTime <= 1) {
                      setIsCountingDown(false);
                      setIsLoginDisabled(false);
                      setLoginAttempts(0);
                      return 300;
                  }
                  return prevTime - 1;
              });
          }, 1000);
      }
      return () => clearInterval(timer);
  }, [isCountingDown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with email:", email);
    console.log("handleSubmit triggered");
    
    // Check if account is locked
    if (loginAttempts >= 5) {
        swal("Error!", "Too many failed attempts. Your account has been locked.", "error");
        return; // Prevent further actions
    }

    axios.get(`https://localhost:5000/login/${email}`).then((res) => {
      if (res.data.data != null) {
        let hashPass = res.data.data.password;
        console.log(password);
        const isValid = bcrypt.compareSync(password, hashPass);
        if (isValid) {
          console.log(res.data);
          const token = {
            id: res.data.data._id,
            iD: res.data.data.iD,
            email: res.data.data.email,
            type: res.data.data.type,
          };

            // Check if user is locked
        if (res.data.data.isLocked) {
          swal("Error!", "Your account has been locked. Contact support.", "error");
          return; // Stop further execution
      }

            const isValid = bcrypt.compareSync(password, hashPass);
            if (isValid) {
                const token = {
                    id: res.data.data._id,
                    iD: res.data.data.iD,
                    email: res.data.data.email,
                    type: res.data.data.type,
                };
                
                sessionStorage.setItem("token", JSON.stringify(token));
                navigate(res.data.data.type);
                swal("Success!", "Login Successful", "success");
            } else {
              
                handleFailedLoginAttempt();
                swal("Error!", "Invalid Password", "error");
            }
        } else {
         
            handleFailedLoginAttempt();
            swal("Error!", "Invalid Email", "error");
        }
    }}).catch((error) => {
        console.error("Error during login:", error);
    });
}

const handleFailedLoginAttempt = () => {
  console.log("Handling failed login attempt");
    setLoginAttempts(prev => prev + 1);
    if (loginAttempts + 1 >= 5) {  // +1 because we're about to increment it
      console.log("Login attempts exceeded. Locking account.");
      setIsLoginDisabled(true);      
      setIsCountingDown(true);
      lockAccount();
    } else {
      console.log("Incrementing login attempts to:", loginAttempts + 1);
        swal("Error!", "Invalid Credentials", "error");
    }
}

const lockAccount = () => {
    axios.post(`http://localhost:5000/login/lock`, { email }).then((response) => {
        swal("Error!", "Too many failed attempts. Your account has been locked.", "error");
        console.error(" locking account:", response);
    }).catch((error) => {
        console.error("Error while locking account:", error);
    });
}

 

    return (
        <div>
          <div className="ContainerL">
          <div className="wrapperl">
            <div className="loginform">
              <h1> SIGN IN</h1>
              <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        pattern="[a-z]{2}\d{8}@my.sliit.lk|[a-z]{2,}.[a-z]{1}@sliit.lk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter a Password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                  </Form.Control.Feedback>
                
                </Form.Group>
                
                {isLoginDisabled && isCountingDown ? (
                                <>
                                    
                                    <p style={{ color: "red", fontWeight: "bold" }}>
                                        You can try only 5 attempts, and it has already exceeded.
                                        You can try again after {remainingTime} seconds.
                                    </p>
                                </>
                            ) : (
                                <Button variant="success" type="submit">
                                    Login
                                </Button>
                            )}

                 <br />
                <br />

                <h5>Don't have an account ? </h5>
                
                <Button variant="success" onClick={() => setModalsignup(true)}>
                  Sign Up
                </Button>
            </Form>
            <UserModalSignup
                show={Modalsignup}
                onHide={() => setModalsignup(false)}
              />
        </div>
        </div>
          </div>
        </div>
    );
};

export default UserLogin;
