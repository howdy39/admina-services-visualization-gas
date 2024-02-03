import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class SheetService {
  static createInitialFile(prefix: string): Spreadsheet {
    const fileName = prefix + 'hoge';
    const ss = SpreadsheetApp.create(fileName);
    const range = ss.getRange('A1');
    range.setValue('Hello, clasp!');
    return ss;
  }
}
