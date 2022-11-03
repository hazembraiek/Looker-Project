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
    value: "title",
    show: true,
  },
  {
    id: v4(5),
    heading: "Category",
    value: "category",
    show: true,
  },
  {
    id: v4(5),
    heading: "Longitude",
    value: "longitude",
    show: true,
  },
  {
    id: v4(5),
    heading: "Latitude",
    value: "latitude",
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
    value: "title",
    show: true,
  },
  {
    id: v4(5),
    heading: "Category",
    value: "category",
    show: true,
  },
  {
    id: v4(5),
    heading: "Longitude",
    value: "longitude",
    show: true,
  },
  {
    id: v4(5),
    heading: "Latitude",
    value: "latitude",
    show: true,
  },
  {
    id: v4(5),
    heading: "user",
    value: "user",
    show: true,
  },
  {
    id: v4(5),
    heading: "status",
    value: "status",
    show: true,
    1: { label: "accepted", className: "accept" },
    2: { label: "refused", className: "refuse" },
    3: { label: "in review...", className: "inreview" },
    type: "bool",
  },
  { id: v4(5), heading: "Action", type: "action" },
];

// {
//   _id: "220.142.55.28/27",
//   title: "Daune",
//   category: "Drywall & Acoustical (MOB)",
//   longitude: 49.3550162,
//   latitude: -32.9867567,
//   status: true,
//   user: "a5a5:3761:2c1d:caec:6613:e411:92e0:87be/125",
// },

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
