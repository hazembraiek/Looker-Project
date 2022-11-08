import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "../../components/loadingView/LoadingView";
import MuiTable from "../../components/table/Table";
import { porductsListColumn } from "../../constant/ColumnsTable";
import { productFormData } from "../../constant/ModalFormTypes";
import { useModalFormContext } from "../../context/modalFormContext";
import TableLayout from "../../layouts/tableLayout/TableLayout";
import { deleteProduct, getProducts } from "../../store/slices/products";
import Menu from "../components/menu/Menu";

const list = [
  { _id: "true", title: "Products List", active: true },
  // { _id: "false", title: "Request Products" },
];

function Products() {
  const [switchedList, setSwitchedList] = useState(list);
  const [all, setAll] = useState("true");
  const { showPopup } = useModalFormContext();
  const { products, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const requestPlacesActions = [
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        console.log("Delete", { item });
      },
    },
    {
      icon: "",
      label: "Accept",
      action: (item) => {
        console.log("Accept", { item });
      },
    },
    {
      icon: "",
      label: "Refuse",
      action: (item) => {
        console.log("Refuse", { item });
      },
    },
  ];

  const porductActions = [
    {
      icon: "",
      label: "Edit",
      action: (item) => {
        showPopup(productFormData, item);
      },
    },
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        dispatch(deleteProduct(item?._id));
      },
    },
  ];

  useEffect(() => {
    setSwitchedList(
      switchedList.map((item) =>
        item._id == all ? { ...item, active: true } : { ...item, active: false }
      )
    );
    if (all == "true") {
      if (products?.length == 0) {
        dispatch(getProducts());
      }
    }
  }, [all]);
  console.log({ products });
  return (
    <div className="products">
      <Menu
        title="Products List"
        description="Products"
        number={products?.length}
        labelButton="Add New Product"
        onClick={() => {
          showPopup(productFormData);
        }}
        switchList={switchedList}
        setActive={(id) => setAll(id)}
      />
      <TableLayout>
        <LoadingView loading={loading}>
          <div className="data-container-content-table">
            <MuiTable
              columns={all == "true" ? porductsListColumn : []}
              data={all == "true" ? products : []}
              tableActions={all == "true" ? porductActions : []}
            />
          </div>
        </LoadingView>
      </TableLayout>
    </div>
  );
}

export default Products;
