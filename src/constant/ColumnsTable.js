import { v4 } from "uuid";

export const placesListColumn = [
  { id: v4(5), type: "radio" },
  {
    id: v4(5),
    heading: "Place ID",
    value: "_id",
    className: "higlightRow",
    show: true,
  },
  {
    id: v4(5),
    heading: "Title",
    value: "name",
    show: true,
  },
  {
    id: v4(5),
    heading: "Category",
    value: "category",
    show: true,
    nestedLabel: "name",
  },
  {
    id: v4(5),
    heading: "Longitude",
    value: "lan",
    show: true,
  },
  {
    id: v4(5),
    heading: "Latitude",
    value: "lat",
    show: true,
  },
  { id: v4(5), heading: "Action", type: "action" },
];

export const requestPlacesListColumn = [
  { id: v4(5), type: "radio" },
  {
    id: v4(5),
    heading: "Place ID",
    value: "_id",
    className: "higlightRow",
    show: true,
  },
  {
    id: v4(5),
    heading: "Title",
    value: "name",
    show: true,
  },
  {
    id: v4(5),
    heading: "Category",
    value: "category",
    show: true,
    nestedLabel: "name",
  },
  {
    id: v4(5),
    heading: "Longitude",
    value: "lan",
    show: true,
  },
  {
    id: v4(5),
    heading: "Latitude",
    value: "lat",
    show: true,
  },
  {
    id: v4(5),
    heading: "status",
    value: "status",
    show: true,
    1: { label: "refused", className: "refuse" },
    2: { label: "in review...", className: "inreview" },
    3: { label: "accepted", className: "accept" },
    type: "bool",
  },
  { id: v4(5), heading: "Action", type: "action" },
];

export const porductsListColumn = [
  { id: v4(5), type: "radio" },
  {
    id: v4(5),
    heading: "Product ID",
    value: "_id",
    className: "higlightRow",
    show: true,
  },
  {
    id: v4(5),
    heading: "Icon",
    value: "img",
    type: "img",
    className: "flag",
    show: true,
  },
  {
    id: v4(5),
    heading: "Title",
    value: "name",
    show: true,
  },

  { id: v4(5), heading: "Action", type: "action" },
];

export const categoriesListColumn = [
  { id: v4(5), type: "radio" },
  {
    id: v4(5),
    heading: "Category ID",
    value: "_id",
    className: "higlightRow",
    show: true,
  },
  {
    id: v4(5),
    heading: "Icon",
    value: "img",
    type: "img",
    className: "flag",
    show: true,
  },
  {
    id: v4(5),
    heading: "Title",
    value: "name",
    show: true,
  },

  { id: v4(5), heading: "Action", type: "action" },
];

// createdAt: "2022-11-05T13:11:44.011Z";
// img: "https://res.cloudinary.com/dbzioodo9/image/upload/v1667653903/categories/jb4qt70euejklda1hb6h.jpg";
// name: "gas station";
// products: (2)[("6364e5e99447f4058611e570", "6364e5a99447f4058611e56c")];
// updatedAt: "2022-11-06T17:35:10.723Z";
export const usersListColumns = [
  { id: v4(5), type: "radio" },
  {
    id: v4(5),
    heading: "User ID",
    value: "_id",
    className: "higlightRow",
    show: true,
  },
  { id: v4(5), heading: "First Name", value: "firstName", show: true },
  { id: v4(5), heading: "Last Name", value: "lastName", show: true },
  { id: v4(5), heading: "Phone Number", value: "phone", show: true },
  { id: v4(5), heading: "Email", value: "email", className: "higlightRow" },
  {
    id: v4(5),
    heading: "Country",
    value: "countryCode",
    nestedLabel: "name",
    show: true,
  },
  {
    id: v4(5),
    heading: "CreatedAt",
    value: "createdAt",
    type: "date",
    show: false,
  },
  {
    id: v4(5),
    heading: "UpdatedAt",
    value: "updatedAt",
    type: "date",
    show: false,
  },
  { id: v4(5), heading: "Action", type: "action" },
];
