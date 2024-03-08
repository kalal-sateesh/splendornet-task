import { useContext, useEffect, useState } from "react";
import styles from "../components/Home.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "./HomeSlice";
const Home = () => {
  const [file, setFile] = useState("");
  const [fileErrorMsg, setFileErrorMsg] = useState("");

  const fileRegExp = /^[A-Z]{2}-\d{4}$/;

  const { isAuth, LogoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.fileData.data);

  const list = data.length
    ? data.map((ele, index) => {
        return <li key={index}>{ele}</li>;
      })
    : "";

  const handleLogout = () => {
    localStorage.clear();
    LogoutHandler();
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  const handleAddFile = () => {
    if (!fileRegExp.test(file)) {
      setFileErrorMsg("Please choose a valid excel file");
      setTimeout(() => {
        setFileErrorMsg("");
      }, 2000);
      return;
    }
    dispatch(
      addData({
        file: file,
      })
    );
  };

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.welcome}>
            <h2>Welcome to Home page</h2>
          </div>
          <div className={styles.btn}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </header>
      <div className={styles.file}>
        <input type="file" onChange={(e) => setFile(e.target.value)} />
        <br></br>
        <span style={{ color: "red" }}>{fileErrorMsg}</span>
        <br></br>
        <button onClick={handleAddFile}>Add File</button>
      </div>
      <ul>{list}</ul>
    </>
  );
};

export default Home;
