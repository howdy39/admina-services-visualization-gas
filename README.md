# admina-services-visualization-gas
Google Apps Script to visualize SaaS usage in Looker Studio using Admina API.

## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)

## Getting Started
### Install dependencies
```
npm install
```

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
