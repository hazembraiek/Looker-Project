import React, { useEffect, useState } from "react";
import LoadingView from "../../components/loadingView/LoadingView";
import MuiTable from "../../components/table/Table";
import {
  placesListColumn,
  requestPlacesListColumn,
} from "../../constant/ColumnsTable";
import { createPlaceFormData } from "../../constant/ModalFormTypes";
import { useModalFormContext } from "../../context/modalFormContext";
import TableLayout from "../../layouts/tableLayout/TableLayout";
import Menu from "../components/menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlace,
  getPlaces,
  getRequestPlaces,
  updatePlace,
} from "../../store/slices/places";

const list = [
  { _id: "true", title: "Places List", active: true },
  { _id: "false", title: "Request Places" },
];

function Places() {
  const [switchedList, setSwitchedList] = useState(list);
  const [all, setAll] = useState("true");
  const { showPopup } = useModalFormContext();
  const { places, error, loading } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  const requestPlacesActions = [
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        dispatch(deletePlace(item?._id));
      },
    },
    {
      icon: "",
      label: "Accept",
      action: (item) => {
        dispatch(updatePlace({ id: item?._id, place: { status: 3 } }));
      },
    },
    {
      icon: "",
      label: "Refuse",
      action: (item) => {
        dispatch(updatePlace({ id: item?._id, place: { status: 1 } }));
      },
    },
  ];
  const placesActions = [
    {
      icon: "",
      label: "Edit",
      action: (item) => {
        showPopup(createPlaceFormData, item);
      },
    },
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        dispatch(deletePlace(item?._id));
      },
    },
  ];

  useEffect(() => {
    setSwitchedList(
      switchedList.map((item) =>
        item._id == all ? { ...item, active: true } : { ...item, active: false }
      )
    );
    if (all == "false") dispatch(getPlaces({ status: 2 }));
    else dispatch(getPlaces());
  }, [all]);

  return (
    <div className="places">
      <Menu
        title="Places List"
        description="Places"
        number={100}
        labelButton="Add New Place"
        onClick={() => {
          showPopup(createPlaceFormData);
        }}
        switchList={switchedList}
        setActive={(id) => setAll(id)}
      />
      <TableLayout>
        <LoadingView loading={loading}>
          <div className="data-container-content-table">
            <MuiTable
              columns={
                all == "true" ? placesListColumn : requestPlacesListColumn
              }
              data={places}
              tableActions={
                all == "true" ? placesActions : requestPlacesActions
              }
            />
          </div>
        </LoadingView>
      </TableLayout>
    </div>
  );
}

export default Places;
