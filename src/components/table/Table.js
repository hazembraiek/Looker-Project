import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
  TableSortLabel,
} from "@mui/material";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TableColumnType } from "../../constant/columnTableTypes";
import TableString from "./components/tableString";
import TableDndIcon from "./components/tableDndIcon";
import TableRadioIcon from "./components/tableRadioIcon";

const RowCell = ({ children, column, drag }) => {
  return (
    <TableCell
      {...drag}
      className="tableCell"
      sx={{
        ":last-child": {
          textAlign: "right",
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          paddingRight: "30px",
        },
        padding: "16px",
        position: "relative",
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Poppins",
        borderBottom: "none",
        cursor: column.type == "dnd" ? "grab" : "cursor",
      }}
    >
      {children}
    </TableCell>
  );
};

const Column = ({ data, orderBy, createSortHandler, order }) => {
  const iconStyle = data.type ? { width: "50px" } : {};
  return (
    <TableCell
      sortDirection={orderBy === data.value ? order : false}
      sx={{
        fontWeight: "500",
        fontSize: "16px",
        color: "#91939A",
        ":last-child": {
          textAlign: "right",
          paddingRight: "25px",
        },
        ":first-of-type": { ...iconStyle },
        fontFamily: "Poppins",
      }}
    >
      <TableSortLabel>
        {data.type == "radio" ? (
          <TableRadioIcon />
        ) : data.type == "dnd" ? (
          <TableDndIcon />
        ) : (
          data.heading
        )}
      </TableSortLabel>
    </TableCell>
  );
};

const Row = ({ data, column, tableActions, drag }) => {
  const RowDataComponent = TableColumnType[column?.type] || TableString;
  return (
    <RowCell column={column} drag={drag}>
      {!["radio", "dnd", "action", "array"].includes(column?.type) && (
        <div
          className="TableRow"
          onClick={() =>
            tableActions?.find(({ code }) => code === 1)?.action(data?._id)
          }
        ></div>
      )}
      {
        <RowDataComponent
          column={column}
          data={data}
          tableActions={tableActions}
        />
      }
    </RowCell>
  );
};

function MuiTable({ columns, data = [], tableActions, handleDragEnd }) {
  const dnd = columns.find((col) => col.type == "dnd");
  window["__react-beautiful-dnd-disable-dev-warnings"] = true;
  return (
    <>
      {data?.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            borderBottomColor: "transparent",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            fontFamily: "Poppins",
            overflow: "visible",
            boxShadow: "none",
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
              border: "1px solid #E8E8E8",
            }}
          >
            <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
              <TableRow sx={{ padding: "12.5px" }}>
                {columns?.map((column, i) =>
                  column?.show == undefined || column?.show ? (
                    <Column key={i} data={column} />
                  ) : null
                )}
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="table-body" direction="vertical">
                {(provided) => {
                  return (
                    <TableBody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {data.map((value, j) => {
                        return (
                          <Draggable
                            draggableId={value?.order?.toString() || value._id}
                            key={j}
                            index={value?.order || j}
                            isDragDisabled={dnd ? false : true}
                          >
                            {(p, s) => {
                              const props = { ...p.dragHandleProps };
                              return (
                                <TableRow
                                  className="tableRow"
                                  key={value._id}
                                  sx={{
                                    cursor: "pointer",
                                    padding: "16px 18px 16px 13px",
                                    borderBottom: "1px solid #E8E8E8",
                                    backgroundColor: "white",
                                    position: "relative",
                                  }}
                                  ref={p.innerRef}
                                  {...p.draggableProps}
                                  style={{
                                    ...p.draggableProps.style,
                                    background: s.isDragging
                                      ? "rgba(245,245,245, 0.75)"
                                      : "none",
                                  }}
                                >
                                  {columns.map((column, i) =>
                                    column?.show == undefined ||
                                    column?.show ? (
                                      <Row
                                        data={value}
                                        column={column}
                                        tableActions={tableActions}
                                        key={i}
                                        drag={column.type == "dnd" ? props : {}}
                                      />
                                    ) : null
                                  )}
                                </TableRow>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </TableBody>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
      ) : (
        <p className="isEmpty">There is not data</p>
      )}
    </>
  );
}

export default MuiTable;
