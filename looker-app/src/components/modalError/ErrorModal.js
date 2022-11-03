import React, { useEffect } from "react";
import error from "./../../assets/icons/xmark-solid.svg";
import success from "./../../assets/icons/check-solid.svg";
import { useApiErrorContext } from "../../context/apiErrorContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopupTime = { success: 500, error: 3000 };

function ErrorModal() {
  const {
    message = "hazem",
    hide,
    type = "success",
    show,
    random = Math.random(),
  } = useApiErrorContext();
  const notify = () => toast[type.toLocaleLowerCase()](message);
  useEffect(() => {
    if (message != "") notify();
  }, [message, random]);
  return (
    <div className="">
      {/* <div
        className="popup__response"
        style={{ backgroundColor: `${type === "ERROR" ? "red" : "green"}` }}
      >
        <p>
          <img
            src={type === "ERROR" ? error : success}
            alt=""
            className="mediumSizeImg"
          />
        </p>
      </div> */}
      <ToastContainer
        position="top-left"
        autoClose={PopupTime[type.toLocaleLowerCase()]}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ErrorModal;
