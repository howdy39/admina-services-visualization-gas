import { AdminaService } from './AdminaService';

const ADMINA_ORGANIZATION_ID = Number(
  PropertiesService.getScriptProperties().getProperty('ADMINA_ORGANIZATION_ID'),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function test() {
  const services = AdminaService.listServices(ADMINA_ORGANIZATION_ID);
  services.forEach((service) => {
    console.log({ service });
    AdminaService.listAllAccountsOfAServices(ADMINA_ORGANIZATION_ID, service.id);
  });
}
