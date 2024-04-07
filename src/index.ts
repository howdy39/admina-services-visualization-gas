import { AdminaService, listAllAccountsOfAServicesResonse } from './AdminaService';
import { SheetService } from './SheetService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setTriggers() {
  ScriptApp.newTrigger('writeAccountsServices')
    .timeBased()
    .everyDays(1)
    .atHour(7)
    .nearMinute(0)
    .create();

  ScriptApp.newTrigger('writeWorkspaces').timeBased().everyDays(1).atHour(7).nearMinute(0).create();
}

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
      '表示名',
      'ステータス',
      '従業員ステータス',
      '最終利用日',
      'サービスID',
      'サービス名',
      'ワークスペースID',
      'ワークスペース名',
      '最終取得ステータス',
      '最新取得日',
    ],
  ];
  listAllAccountsOfAServices.forEach((ac) => {
    writeValues.push([
      ac.email,
      ac.displayName,
      ac.status,
      ac.employeeStatus,
      ac.lastActivity,
      ac.serviceId,
      ac.serviceName,
      ac.workspaceId,
      ac.workspaceName,
      ac.lastExecutionStatus,
      ac.lastExecutionTime,
    ]);
  });

  const WRITE_ACCOUNTS_SERVICES_SHEET_NAME = PropertiesService.getScriptProperties().getProperty(
    'WRITE_ACCOUNTS_SERVICES_SHEET_NAME',
  );

  if (WRITE_ACCOUNTS_SERVICES_SHEET_NAME === null) {
    throw new Error(`not found properties WRITE_ACCOUNTS_SERVICES_SHEET_NAME`);
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const writeSheet = ss.getSheetByName(WRITE_ACCOUNTS_SERVICES_SHEET_NAME);

  if (writeSheet === null) {
    throw new Error(`not found ${WRITE_ACCOUNTS_SERVICES_SHEET_NAME}`);
  }

  SheetService.writeValues(writeSheet, writeValues);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeWorkspaces() {
  const ADMINA_ORGANIZATION_ID = Number(
    PropertiesService.getScriptProperties().getProperty('ADMINA_ORGANIZATION_ID'),
  );
  const workspaces = AdminaService.listWorkspaces(ADMINA_ORGANIZATION_ID);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeValues: any[] = [
    [
      'ワークスペースID',
      'ワークスペース名',
      '最終利用日時',
      'カスタムワークスペース',
      '管理者メールアドレス',
      '管理者名',
      'メタID',
      'メモ',
    ],
  ];
  workspaces.forEach((w) => {
    writeValues.push([
      w.id,
      w.workspaceName,
      w.lastUsedAt,
      w.isCustomWorkspace,
      w.peopleInCharge_primaryEmail,
      w.peopleInCharge_displayName,
      w.meta_id,
      w.meta_note,
    ]);
  });

  const WRITE_WORKPSACES_SHEET_NAME = PropertiesService.getScriptProperties().getProperty(
    'WRITE_WORKPSACES_SHEET_NAME',
  );

  if (WRITE_WORKPSACES_SHEET_NAME === null) {
    throw new Error(`not found properties WRITE_WORKPSACES_SHEET_NAME`);
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const writeSheet = ss.getSheetByName(WRITE_WORKPSACES_SHEET_NAME);

  if (writeSheet === null) {
    throw new Error(`not found ${WRITE_WORKPSACES_SHEET_NAME}`);
  }

  SheetService.writeValues(writeSheet, writeValues);
}
