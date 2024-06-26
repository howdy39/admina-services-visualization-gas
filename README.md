# admina-services-visualization-gas
Google Apps scripts that use the Admina API to export data to a spreadsheet for visualization of SaaS usage in Looker Studio and other applications.

What is Admina ?  
https://admina.moneyforward.com/

Where is Admina API docs?  
https://docs.itmc.i.moneyforward.com/


## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)

## Getting Started
### Install dependencies
```
npm install
```

### Make a Google Apps script
Make a Google Apps Script with a spreadsheet container bound script!

### Configuration
#### Open `.clasp.json`, change scriptId
What is scriptId ? https://github.com/google/clasp#scriptid-required
```
{
  "scriptId": <your_script_id>,
  "rootDir": "dist"
}
```

#### Open `.package.json`, change properties
The name, version, description, and homepage properties are output as comments at the beginning of the output GAS.

```
...
  "name": "your application name",
  "version": "your application version",
  "description": "your application description",
  "homepage" "your repository url"
...
```

#### Open `src/appsscript.json`, change timeZone (optional)
[Apps Script Manifests](https://developers.google.com/apps-script/concepts/manifests)
```
{
  "timeZone": "Asia/Tokyo", ## Change timeZone
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER"
}
```

#### Set Google Apps Script Properties
- ADMINA_API_KEY
- ADMINA_ORGANIZATION_ID
- WRITE_ACCOUNTS_SERVICES_SHEET_NAME
- WRITE_WORKPSACES_SHEET_NAME


### Development and build project
```
npm run build
```

### Push
```
npm run push
```


## License
This software is released under the MIT License, see LICENSE.txt.
