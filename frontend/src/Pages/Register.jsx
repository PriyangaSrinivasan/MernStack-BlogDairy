import React, { useState } from "react";
import BubbleBackground from "../Components/Bubblebg";
import { registerUser } from "../Redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleAuth from "../OAuth/GoogleAuth";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form))
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => {});
  };

  return (
    <BubbleBackground>
      <StyledWrapper className="d-flex justify-content-center align-items-center vh-100">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Create Account</h2>

          <div className="flex-column">
            <label>Name</label>
          </div>
          <div className="inputForm">
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-column">
            <label>Role</label>
          </div>
          <div className="inputForm">
            <select
              name="role"
              className="input"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button className="button-submit" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="p text-danger">{error}</p>}

          <p className="p line">Or Register With</p>

          {/* Google Auth Button */}
          <GoogleAuth />

          <p className="p">
            Already have an account?{" "}
            <Link to="/login" className="span">
              Login
            </Link>
          </p>
        </form>
      </StyledWrapper>
    </BubbleBackground>
  );
};

export default Register;

/* ------------------ Styled Components ------------------ */

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: linear-gradient(45deg, skyblue, darkblue);
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    transition: background 0.3s ease;
  }

  .form:hover {
    background: linear-gradient(45deg, darkblue, skyblue);
  }

  .title {
    text-align: center;
    color: white;
    font-weight: 700;
    margin-bottom: 10px;
  }

  label {
    color: white;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10em;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    background-color: white;
  }

  .input {
    border: none;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    border-radius: 10rem;
  }

  .input:focus {
    outline: none;
  }

  .button-submit {
    padding: 12px;
    border-radius: 10em;
    border: 2px solid white;
    background: transparent;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease;
    margin-top: 10px;
  }

  .button-submit:hover {
    background: royalblue;
  }

  .p {
    text-align: center;
    color: white;
  }

  .span {
    color: yellow;
    cursor: pointer;
  }

  .line {
    margin: 10px 0;
  }
`;
