import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "../../components/loadingView/LoadingView";
import MuiTable from "../../components/table/Table";
import {
  categoriesListColumn,
  porductsListColumn,
} from "../../constant/ColumnsTable";
import {
  categoryFormData,
  productFormData,
} from "../../constant/ModalFormTypes";
import { useModalFormContext } from "../../context/modalFormContext";
import TableLayout from "../../layouts/tableLayout/TableLayout";
import { deleteCategory, getCategories } from "../../store/slices/categories";
import { deleteProduct, getProducts } from "../../store/slices/products";
import Menu from "../components/menu/Menu";

const list = [
  { _id: "true", title: "Category List", active: true },
  // { _id: "false", title: "Request Products" },
];

function Categories() {
  const [switchedList, setSwitchedList] = useState(list);
  const [all, setAll] = useState("true");
  const { showPopup } = useModalFormContext();

  const { categories, error, loading } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  const categoriesActions = [
    {
      icon: "",
      label: "Edit",
      action: (item) => {
        showPopup(categoryFormData, item);
      },
    },
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        dispatch(deleteCategory(item?._id));
      },
    },
  ];

  useEffect(() => {
    setSwitchedList(
      switchedList.map((item) =>
        item._id == all ? { ...item, active: true } : { ...item, active: false }
      )
    );
    if (categories?.length == 0) {
      dispatch(getCategories());
    }
  }, [all]);

  console.log({ categories });

  return (
    <div className="products">
      <Menu
        title="Categories List"
        description="Categories"
        number={categories?.length}
        labelButton="Add New Category"
        onClick={() => {
          showPopup(categoryFormData);
        }}
        switchList={switchedList}
        setActive={(id) => setAll(id)}
      />
      <TableLayout>
        <LoadingView loading={loading}>
          <div className="data-container-content-table">
            <MuiTable
              columns={categoriesListColumn}
              data={categories}
              tableActions={categoriesActions}
            />
          </div>
        </LoadingView>
      </TableLayout>
    </div>
  );
}

export default Categories;
