import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class SheetService {
  static writeAccountsServices(
    writeSheet: GoogleAppsScript.Spreadsheet.Sheet,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    writeValues: any[][],
  ) {
    writeSheet.getDataRange().clearContent();
    const range = writeSheet.getRange(1, 1, writeValues.length, writeValues[0].length);
    range.setValues(writeValues);
  }
}
