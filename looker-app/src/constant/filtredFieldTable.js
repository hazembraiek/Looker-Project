import { statusOptions } from "../views/chapters/components/form/createChapterForm";

export const FieldTypes = {
  INPUT: "input",
  SELECT: "select",
  DATE: "date",
};

export const questionsFilterFieldsList = [
  { field: "Name", value: "title", type: FieldTypes.INPUT },
  { field: "Order", value: "order", type: FieldTypes.INPUT },
  // {
  //   field: "Question Block Types",
  //   value: "questionBlockType",
  //   type: FieldTypes.SELECT,
  // },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const lessonsFilterFieldsList = [
  { field: "Title", value: "title", type: FieldTypes.INPUT },
  { field: "Subtitle", value: "subtitle", type: FieldTypes.INPUT },
  { field: "Duration", value: "time", type: FieldTypes.INPUT },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const exercicesFilterFieldsList = [
  { field: "Title", value: "title", type: FieldTypes.INPUT },
  { field: "Order", value: "order", type: FieldTypes.INPUT },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
  // { field: "exercice Type", value: "order", type: FieldTypes.SELECT },
];

export const levelsFilterFieldsList = [
  { field: "Level Title", value: "title", type: FieldTypes.INPUT },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const chaptersFilterFieldsList = [
  { field: "Chapter Name", value: "title", type: FieldTypes.INPUT },
  { field: "Description", value: "shortDescription", type: FieldTypes.INPUT },
  {
    field: "status",
    value: "isEnable",
    data: statusOptions,
    type: FieldTypes.SELECT,
  },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const counriesFilterFieldsList = [
  { field: "Country Name", value: "name", type: FieldTypes.INPUT },
  { field: "Code", value: "code", type: FieldTypes.INPUT },
  // {
  //   field: "Verfication Type",
  //   value: "isEnable",
  //   type: FieldTypes.SELECT,
  // },
  {
    field: "Abbrevations",
    value: "ISOCode",
    type: FieldTypes.INPUT,
  },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const keywordsFilterFieldsList = [
  // { field: "Senetence", value: "sentence", type: FieldTypes.INPUT },
  // { field: "Example", value: "example", type: FieldTypes.INPUT },
  // // {
  // //   field: "Verfication Type",
  // //   value: "isEnable",
  // //   type: FieldTypes.SELECT,
  // // },
  // {
  //   field: "Translate",
  //   value: "translate",
  //   type: FieldTypes.INPUT,
  // },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const reportsFilterFieldsList = [
  // { field: "User", value: "user", type: FieldTypes.INPUT },
  // { field: "Question", value: "questionId", type: FieldTypes.INPUT },
  {
    field: "Description",
    value: "description",
    type: FieldTypes.INPUT,
  },
  {
    field: "Status",
    value: "isClosed",
    data: [
      { label: "Open", value: false },
      { label: "Close", value: true },
    ],
    type: FieldTypes.SELECT,
  },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];

export const questionTypesFilterFieldsList = [
  { field: "Title", value: "title", type: FieldTypes.INPUT },
  { field: "Color", value: "color", type: FieldTypes.INPUT },
  {
    field: "CreatedAt",
    value: "createdAt",
    type: FieldTypes.DATE,
  },
  {
    field: "UpdatedAt",
    value: "updatedAt",
    type: FieldTypes.DATE,
  },
];
