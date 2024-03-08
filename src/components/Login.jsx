import { useContext, useState } from "react";
import styles from "../components/Login.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const navigate = useNavigate();
  const { LoginHandler } = useContext(AuthContext);

  const handleLogin = () => {
    if (!emailRegExp.test(email)) {
      setEmailErrorMsg("Please enter a valid email");
      setTimeout(() => {
        setEmailErrorMsg("");
      }, 2000);
      return;
    }
    if (!passwordRegExp.test(password)) {
      setPasswordErrorMsg(
        "Password must be 8 digits and one special symbol and one numaric value and one uppercase letter and charecter"
      );
      setTimeout(() => {
        setPasswordErrorMsg("");
      }, 2000);
      return;
    }
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setTimeout(() => {
      LoginHandler();
      alert("successfully logged in");
      navigate("/");
    }, 2000);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
      <h3>Login Here</h3>
        <input
          placeholder="Please enter email here"
          style={{ marginTop: "30px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <span style={{ color: "red" }}>{emailErrorMsg}</span>
        <br></br>
        <br></br>
        <input
          placeholder="Please enter password here"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br></br>
        <span style={{ color: "red" }}>{passwordErrorMsg}</span>
        <br></br>
        <br></br>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
