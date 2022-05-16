# 17. Mai 2022

Oversiktsside for veranda-til-veranda-arrangement

## Oppstart

```bash
npm run dev
# or
yarn dev
```

Appen kjører på localhost:3000.

## Hemmeligheter
Hvis du vil logge inn med Google må du opprette et prosjekt i console.gloud.google.com og sette opp Oauth2-autentisering.  
Legg inn env-variablene GOOGLE_CLIENT_ID og GOOGLE_CLIENT_SECRET.

Dataen hentes fra Google Sheets. For dette trengs en IAM-bruker hos Google.  
Dette kan settes opp på samme side som Oauth2-autentiseringen slik som beskrevet på [Kode24](https://www.kode24.no/guider/google-sheets-er-et-sjitbra-cms/73340743) og JSON-stringen settes i env-variablen `login_val`.

