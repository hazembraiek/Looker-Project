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

const mock2 = [
  {
    _id: "63.153.104.158/15",
    title: "Ediva",
    category: "Elevator",
    longitude: 36.4465346,
    latitude: 63.8105554,
    status: 1,
    user: "Catherine",
  },
  {
    _id: "26.226.201.73/12",
    title: "Bengt",
    category: "Construction Clean and Final Clean",
    longitude: 44.1136058,
    latitude: 24.479833,
    status: 2,
    user: "Petronille",
  },
  {
    _id: "160.17.20.209/30",
    title: "Raychel",
    category: "HVAC",
    longitude: 34.99204,
    latitude: 47.4430894,
    status: 3,
    user: "Sonnie",
  },
  {
    _id: "230.106.97.220/10",
    title: "Miguelita",
    category: "Drywall & Acoustical (MOB)",
    longitude: 44.1316723,
    latitude: 51.361479,
    status: 4,
    user: "Atlante",
  },
  {
    _id: "50.233.68.105/29",
    title: "Shepard",
    category: "Electrical",
    longitude: 37.8594105,
    latitude: 9.6588232,
    status: 5,
    user: "Antoine",
  },
  {
    _id: "162.98.9.67/10",
    title: "Nikolia",
    category: "Structural & Misc Steel Erection",
    longitude: 53.2993199,
    latitude: 51.227821,
    status: 6,
    user: "Nolie",
  },
  {
    _id: "105.169.89.123/4",
    title: "Harriet",
    category: "Masonry & Precast",
    longitude: 15.4687838,
    latitude: 50.051293,
    status: 7,
    user: "Samara",
  },
  {
    _id: "10.219.153.133/27",
    title: "Travers",
    category: "Drilled Shafts",
    longitude: 38.7418853,
    latitude: -19.5097867,
    status: 8,
    user: "Noam",
  },
  {
    _id: "3.182.81.227/21",
    title: "Tera",
    category: "Plumbing & Medical Gas",
    longitude: 17.0597577,
    latitude: 41.0699247,
    status: 9,
    user: "Rhona",
  },
  {
    _id: "7.228.194.19/14",
    title: "Jennine",
    category: "Landscaping & Irrigation",
    longitude: 28.572029,
    latitude: 46.8485653,
    status: 10,
    user: "Norry",
  },
  {
    _id: "40.62.254.226/18",
    title: "Krystal",
    category: "Sitework & Site Utilities",
    longitude: 23.028301,
    latitude: 29.3352938,
    status: 11,
    user: "Muffin",
  },
  {
    _id: "154.128.171.153/15",
    title: "Nyssa",
    category: "Roofing (Metal)",
    longitude: -1.3050431,
    latitude: 43.7441795,
    status: 12,
    user: "Phillipp",
  },
  {
    _id: "43.144.12.102/2",
    title: "Hollis",
    category: "Temp Fencing, Decorative Fencing and Gates",
    longitude: 39.6048507,
    latitude: 47.1892329,
    status: 13,
    user: "Jillene",
  },
  {
    _id: "4.27.129.7/14",
    title: "Elliott",
    category: "Structural and Misc Steel (Fabrication)",
    longitude: 35.2113383,
    latitude: 24.246769,
    status: 14,
    user: "Shayna",
  },
  {
    _id: "100.214.40.232/2",
    title: "Robers",
    category: "Framing (Wood)",
    longitude: 1.7174656,
    latitude: 23.1351485,
    status: 15,
    user: "Kermit",
  },
  {
    _id: "121.28.40.175/5",
    title: "Eldin",
    category: "Granite Surfaces",
    longitude: 41.5359304,
    latitude: 7.8286837,
    status: 16,
    user: "Kelly",
  },
  {
    _id: "140.78.179.126/11",
    title: "Adair",
    category: "Doors, Frames & Hardware",
    longitude: 37.3785618,
    latitude: 41.1653042,
    status: 17,
    user: "Cinda",
  },
  {
    _id: "234.149.171.42/11",
    title: "Harman",
    category: "Landscaping & Irrigation",
    longitude: -14.5460011,
    latitude: 51.0377167,
    status: 18,
    user: "Elberta",
  },
  {
    _id: "232.133.215.233/17",
    title: "Aeriela",
    category: "Ornamental Railings",
    longitude: -0.9233715,
    latitude: 35.85544,
    status: 19,
    user: "Reynard",
  },
  {
    _id: "55.111.50.95/8",
    title: "Barret",
    category: "Exterior Signage",
    longitude: 31.364042,
    latitude: 46.5402775,
    status: 20,
    user: "Giffer",
  },
];

const mock = [
  {
    _id: "62.140.177.114/8",
    title: "Billi",
    category: "Electrical and Fire Alarm",
    longitude: 8.5087615,
    latitude: 51.4758022,
  },
  {
    _id: "29.127.26.96/26",
    title: "Kristofor",
    category: "Drilled Shafts",
    longitude: 41.9310069,
    latitude: 41.6690275,
  },
  {
    _id: "56.84.17.93/6",
    title: "Karel",
    category: "Roofing (Metal)",
    longitude: 20.5439984,
    latitude: 1.4092978,
  },
  {
    _id: "103.62.177.158/27",
    title: "Maible",
    category: "Termite Control",
    longitude: 5.7022374,
    latitude: -10.1678413,
  },
  {
    _id: "180.64.117.223/8",
    title: "Gunter",
    category: "RF Shielding",
    longitude: 37.1358509,
    latitude: 0.4994734,
  },
  {
    _id: "34.67.5.171/15",
    title: "Roxane",
    category: "Hard Tile & Stone",
    longitude: 47.028397,
    latitude: -6.7816552,
  },
  {
    _id: "237.189.199.48/8",
    title: "Karena",
    category: "Roofing (Asphalt)",
    longitude: 39.2008462,
    latitude: 14.4713275,
  },
  {
    _id: "169.95.180.26/25",
    title: "Cheri",
    category: "Hard Tile & Stone",
    longitude: -3.129696,
    latitude: -36.7333,
  },
  {
    _id: "65.121.48.75/16",
    title: "Rena",
    category: "Soft Flooring and Base",
    longitude: 14.1305459,
    latitude: -26.1514859,
  },
  {
    _id: "118.67.159.124/28",
    title: "Daryl",
    category: "Prefabricated Aluminum Metal Canopies",
    longitude: 39.0527074,
    latitude: 37.6583599,
  },
  {
    _id: "167.184.86.139/8",
    title: "Tiffie",
    category: "Structural and Misc Steel (Fabrication)",
    longitude: 46.3176956,
    latitude: 43.817071,
  },
  {
    _id: "235.47.0.190/19",
    title: "Vic",
    category: "Drilled Shafts",
    longitude: 27.8469,
    latitude: 46.96031,
  },
  {
    _id: "67.59.187.209/16",
    title: "Hunfredo",
    category: "Epoxy Flooring",
    longitude: 39.9041999,
    latitude: 48.1973404,
  },
  {
    _id: "121.164.191.150/7",
    title: "Abra",
    category: "Rebar & Wire Mesh Install",
    longitude: 50.2440056,
    latitude: 44.509727,
  },
  {
    _id: "69.127.234.207/11",
    title: "Candide",
    category: "Structural and Misc Steel (Fabrication)",
    longitude: 18.7853365,
    latitude: -12.5183628,
  },
  {
    _id: "44.99.252.199/10",
    title: "Rosanne",
    category: "Retaining Wall and Brick Pavers",
    longitude: 33.3074734,
    latitude: 34.727798,
  },
  {
    _id: "124.165.52.229/25",
    title: "Jocelyn",
    category: "EIFS",
    longitude: 5.8643369,
    latitude: 28.002849,
  },
  {
    _id: "10.50.120.229/8",
    title: "Idette",
    category: "Ornamental Railings",
    longitude: -10.1628,
    latitude: 50.0478165,
  },
  {
    _id: "88.112.218.90/16",
    title: "Hamilton",
    category: "Wall Protection",
    longitude: 58.2031055,
    latitude: -3.2023658,
  },
  {
    _id: "32.102.231.107/30",
    title: "Tami",
    category: "Framing (Steel)",
    longitude: 31.364902,
    latitude: 29.648686,
  },
];

const list = [
  { _id: "true", title: "Places List", active: true },
  { _id: "false", title: "Request Places" },
];

function Places() {
  const [switchedList, setSwitchedList] = useState(list);
  const [all, setAll] = useState("true");
  const { showPopup } = useModalFormContext();

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
  const placesActions = [
    {
      icon: "",
      label: "Edit",
      action: (item) => {
        console.log("Edit", { item });
      },
    },
    {
      icon: "",
      label: "Delete",
      action: (item) => {
        console.log("Delete", { item });
      },
    },
  ];

  useEffect(() => {
    setSwitchedList(
      switchedList.map((item) =>
        item._id == all ? { ...item, active: true } : { ...item, active: false }
      )
    );
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
        <LoadingView loading={false}>
          <div className="data-container-content-table">
            <MuiTable
              columns={
                all == "true" ? placesListColumn : requestPlacesListColumn
              }
              data={all == "true" ? mock : mock2}
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
