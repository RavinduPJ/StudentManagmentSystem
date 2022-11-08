/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as XLSX from "xlsx";
// import ExcelJS from "exceljs";
import { AOA } from "./Enums/Enums";
var fapi = require('file-api');
var FileReader = require('filereader');
var File = fapi.File;

export const readFileAsync = async (
  isAOA: AOA,
  f: any,
  sheetid: string,
  range: number
) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = async (e: any) => {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      //  const wsname = readedData.SheetNames[sheetid];
      const ws = readedData.Sheets[sheetid];

      const dataParse = XLSX.utils.sheet_to_json(ws, {
        raw: true,
        range: range,
        header: isAOA,
        defval: "",
        dateNF: "FMT 14",
      });

      resolve(dataParse);
    };
    reader.readAsBinaryString(new File(f));
  });
};
