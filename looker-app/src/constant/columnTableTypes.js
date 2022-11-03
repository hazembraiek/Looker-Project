import TableAction from "../components/table/components/tableAction";
import TableArray from "../components/table/components/tableArray";
import TableBoolean from "../components/table/components/tableBoolean";
import TableDate from "../components/table/components/tableDate";
import TableDndIcon from "../components/table/components/tableDndIcon";
import TableImage from "../components/table/components/tableImage";
import TableRadioIcon from "../components/table/components/tableRadioIcon";
import TableString from "../components/table/components/tableString";

export const TableColumnType = {
  str: TableString,
  dnd: TableDndIcon,
  action: TableAction,
  radio: TableRadioIcon,
  img: TableImage,
  date: TableDate,
  bool: TableBoolean,
  array: TableArray,
};
