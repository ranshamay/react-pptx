// @ts-nocheck

interface ExcelSheetData {
  [sheetName: string]: [string[]];
}
export interface ExcelData {
  fileName: string;
  sheets: ExcelSheetData;
}
const parseXLS = async (
  file: File,
  cb: (data: ExcelData | undefined) => any
) => {
  const excelData: ExcelData = { fileName: file.name, sheets: {} };

  var reader = new FileReader();

  reader.onload = function (e) {
    try {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });

      workbook.SheetNames.forEach(function (sheetName: string) {
        var XL_row_object = XLS.utils
          .sheet_to_csv(workbook.Sheets[sheetName])
          .split("\n")
          .filter((row) => row.length > 0)
          .map((row) => row.split(",").filter((cell) => cell.length > 0));
        excelData.sheets[sheetName] = XL_row_object;
      });
      cb(excelData);
    } catch (e) {
      console.log("failed to load file", e);
      cb(null);
    }
  };

  reader.onerror = function (e) {
    console.log("failed to load file", e);
    cb(null);
  };

  reader.readAsBinaryString(file);
};

export { parseXLS };
