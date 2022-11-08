import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "../../components/loadingView/LoadingView";
import MuiTable from "../../components/table/Table";
import { porductsListColumn } from "../../constant/ColumnsTable";
import { productFormData } from "../../constant/ModalFormTypes";
import { useModalFormContext } from "../../context/modalFormContext";
import TableLayout from "../../layouts/tableLayout/TableLayout";
import {
  acceptSuggestions,
  deleteSuggestions,
  getSuggestions,
} from "../../store/slices/suggestions";

import Menu from "../components/menu/Menu";

const list = [
  { _id: "1", title: "place Suggestions", active: true },
  { _id: "2", title: "category Suggestions", active: true },
  { _id: "3", title: "product Suggestions", active: true },
  // { _id: "false", title: "Request Products" },
];

function Suggestions() {
  const [switchedList, setSwitchedList] = useState(list);
  const [all, setAll] = useState("1");
  const { showPopup } = useModalFormContext();
  const { suggestions, error, loading } = useSelector(
    (state) => state.suggestions
  );
  const dispatch = useDispatch();

  const suggesionsActions = [
    {
      icon: "",
      label: "Accept",
      action: (item) => {
        dispatch(acceptSuggestions(item?._id));
      },
    },
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        dispatch(deleteSuggestions(item?._id));
      },
    },
  ];

  useEffect(() => {
    setSwitchedList(
      switchedList.map((item) =>
        item._id == all ? { ...item, active: true } : { ...item, active: false }
      )
    );

    dispatch(getSuggestions({ type: +all }));
  }, [all, suggestions]);
  console.log({ suggestions });
  return (
    <div className="suggestions">
      <Menu
        title="Suggesions List"
        description="Suggesions"
        number={suggestions?.length}
        switchList={switchedList}
        setActive={(id) => setAll(id)}
      />
      <TableLayout>
        <LoadingView loading={loading}>
          <div className="data-container-content-table">
            <MuiTable
              columns={all == "true" ? porductsListColumn : []}
              data={all == "true" ? suggestions : []}
              tableActions={all == "true" ? suggesionsActions : []}
            />
          </div>
        </LoadingView>
      </TableLayout>
    </div>
  );
}

export default Suggestions;
