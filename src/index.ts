import { AdminaService, listAllAccountsOfAServicesResonse } from './AdminaService';
import { SheetService } from './SheetService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeAccountsServices() {
  const ADMINA_ORGANIZATION_ID = Number(
    PropertiesService.getScriptProperties().getProperty('ADMINA_ORGANIZATION_ID'),
  );

  const services = AdminaService.listServices(ADMINA_ORGANIZATION_ID);

  let listAllAccountsOfAServices: listAllAccountsOfAServicesResonse[] = [];
  services.forEach((service) => {
    listAllAccountsOfAServices = [
      ...listAllAccountsOfAServices,
      ...AdminaService.listAllAccountsOfAServices(ADMINA_ORGANIZATION_ID, service.id),
    ];
  });

  writeAccountsServices_(listAllAccountsOfAServices);
}

function writeAccountsServices_(listAllAccountsOfAServices: listAllAccountsOfAServicesResonse[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeValues: any[] = [
    [
      'メールアドレス',
      '従業員ステータス',
      'サービスID',
      'サービス名',
      'ワークスペース名',
      '最新取得日',
    ],
  ];
  listAllAccountsOfAServices.forEach((ac) => {
    writeValues.push([
      ac.email,
      ac.employeeStatus,
      ac.serviceId,
      ac.serviceName,
      ac.workspaceName,
      ac.lastExecutionTime,
    ]);
  });

  const WRITE_SHEET_NAME = PropertiesService.getScriptProperties().getProperty('WRITE_SHEET_NAME');

  if (WRITE_SHEET_NAME === null) {
    throw new Error(`not found properties WRITE_SHEET_NAME`);
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const writeSheet = ss.getSheetByName(WRITE_SHEET_NAME);

  if (writeSheet === null) {
    throw new Error(`not found ${WRITE_SHEET_NAME}`);
  }

  SheetService.writeAccountsServices(writeSheet, writeValues);
}
