import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialState = {
  show: false,
  form: "",
  btnLabel: "",
  header: "",
};

const modalFormContext = createContext({
  ...initialState,
});

const reducer = (state, action) => {
  const { header, form, item } = action.payload;
  switch (action.type) {
    case "show":
      return {
        ...state,
        header,
        form,
        show: true,
        item,
        type: item ? "edit" : "create",
      };

    case "hide":
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
};

function ModalFormProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showPopup = ({ form, header }, item) => {
    dispatch({
      type: "show",
      payload: {
        form,
        header,
        item,
      },
    });
  };
  const hidePopup = () => {
    dispatch({
      type: "hide",
      payload: {
        type: "ERROR",
      },
    });
  };

  return (
    <modalFormContext.Provider value={{ ...state, showPopup, hidePopup }}>
      {props.children}
    </modalFormContext.Provider>
  );
}

const useModalFormContext = () => useContext(modalFormContext);

export { useModalFormContext, ModalFormProvider };
