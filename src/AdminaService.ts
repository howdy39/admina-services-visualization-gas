const ADMINA_API_KEY = PropertiesService.getScriptProperties().getProperty('ADMINA_API_KEY');

export interface listServicesResonse {
  id: number;
}

export interface listAllAccountsOfAServicesResonse {
  email: string;
  employeeStatus: string;
  serviceId: number;
  serviceName: string;
  workspaceName: string;
  lastExecutionTime: string;
}

export class AdminaService {
  static listServices(organizationId: number): listServicesResonse[] {
    const basedUrl = `https://api.itmc.i.moneyforward.com/api/v1/organizations/${organizationId}/services/`;
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${ADMINA_API_KEY}`,
      },
    };

    const allServices: listServicesResonse[] = [];
    let nextCursor;

    do {
      let url = `${basedUrl}?limit=200`;
      if (nextCursor) {
        url = `${url}&cursor=${nextCursor}`;
      }
      const response = UrlFetchApp.fetch(url, params);
      const content = JSON.parse(response.getContentText('UTF-8'));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.items.forEach((item: any) => {
        const id = item.id;
        allServices.push({
          id,
        });
      });

      nextCursor = content.meta.nextCursor;
    } while (nextCursor);

    return allServices;
  }

  static listAllAccountsOfAServices(
    organizationId: number,
    serviceId: number,
  ): listAllAccountsOfAServicesResonse[] {
    const basedUrl = `https://api.itmc.i.moneyforward.com/api/v1/organizations/${organizationId}/services/${serviceId}/accounts`;
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${ADMINA_API_KEY}`,
      },
    };

    const allAccounts: listAllAccountsOfAServicesResonse[] = [];
    let nextCursor;

    do {
      let url = `${basedUrl}?limit=200`;
      if (nextCursor) {
        url = `${url}&cursor=${nextCursor}`;
      }
      const response = UrlFetchApp.fetch(url, params);
      const content = JSON.parse(response.getContentText('UTF-8'));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.items.forEach((item: any) => {
        const email = item.email;
        const employeeStatus = item.employeeStatus;
        const serviceId = item.workspace.service.id;
        const serviceName = item.workspace.service.name;
        const lastExecutionTime = item.workspace.lastExecutionTime;
        const workspaceName = item.workspace.workspaceName;
        allAccounts.push({
          email,
          employeeStatus,
          serviceId,
          serviceName,
          workspaceName,
          lastExecutionTime,
        });
      });

      nextCursor = content.meta.nextCursor;
    } while (nextCursor);

    return allAccounts;
  }
}
