import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Basic validation
    if (!username.includes("@") || password.length < 4) {
      alert(
        "Please enter a valid email address and password (password should be more than 3 characters)"
      );
    } else {
      // Your form submission logic here
      alert("Form submitted successfully!");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "300px",
          maxWidth: "96%",
          padding: "120px 45px",
          background: "none",
          position: "relative",
          textAlign: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "350px",
            background: "#0c0d0d",
            color: "#ffffff",
            textAlign: "left",
            padding: "30px 45px",
            borderRadius: "10px",
            boxShadow: "0 0 55px #000",
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
              alt="Spotify Logo"
              style={{ width: "100px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              textTransform: "uppercase",
              margin: "30px 0",
              fontSize: ".95em",
            }}
          >
            <p>sign in</p>
            {/* <p>sign up</p> */}
          </div>
          <span id="msg"></span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="inp-Box name"
            style={{
              color: "#000",
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "1.1em",
              padding: "10px 20px",
              borderRadius: "20px",
              marginBottom: "15px",
              boxShadow: "0 0 15px #000",
              transition: ".1s",
            }}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="inp-Box psd"
            style={{
              color: "#000",
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "1.1em",
              padding: "10px 20px",
              borderRadius: "20px",
              marginBottom: "15px",
              boxShadow: "0 0 15px #000",
              transition: ".1s",
            }}
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              fontSize: ".95em",
              padding: "0px 20px",
              margin: "5px 0",
              accentColor: "#1db954",
            }}
          >
            <input type="checkbox" id="check" />
            <label htmlFor="check" id="checkMsg">
              stay signed in
            </label>
          </div>
          <button
            type="submit"
            className="inp-Box submit"
            style={{
              marginTop: "10px",
              textTransform: "uppercase",
              fontSize: "1em",
              background: "#1db954",
              color: "#ffffff",
              cursor: "pointer",
              transition: ".3s",
              border: "none",
              outline: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              boxShadow: "0 0 15px #000",
            }}
          >
            Sign In
          </button>
          <p className="forgot-Psd">forgot password?</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
