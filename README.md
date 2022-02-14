# Settle Challenge
## For the development of the API was used:

- NodeJS
- HapiJs
- MongoDB

## Start Api locally

- _Access the folder_

```
cd settle-challenge
```

- _Rename the .env.example file to .env and configure it with the server data_
 ```
MONGODB_URI=mongodb+srv://DBURL
NODE_ENV=dev
VERSION=0.0.1
NAME_EXCHANGE=SETTLENETWORKS
FEE_EXCHANGUE=0.03
API_FIXER_URL=http://data.fixer.io/
API_FIXER_KEY=
API_FIXER_FORMAT=1
```

- _Install the dependencies_

```
npm install
```

- _Run the project in development_

```
npm run dev
```

- _Run Test_

```
npm run test
```

### Health api check
-  _GET -> /ping_

Example response:
```
pong
```

### Register a new rate pair
-  _POST -> /rates_

Example request:
```
{
	"pair": "EURUSD", (required)
	"fee": 3,
}
```
Example response:
```
{
     "message": "Successfully Created Pair",
    "data": {
        "pair": "EURCAD",
        "originalRate": 1.445448,
        "fee": 0.03,
        "feeAmount": 0.044704577319587636,
        "rateWithMarkUpFee": 1.4901525773195876,
        "_id": "620ab535b8ee9dc5c3cee399",
        "__v": 0
    }
}
```

### Modify a rate pair
-  _PUT -> /rates_

Example request:
```
{
	"pair": "EURUSD", (required)
	"fee": 3, 
}
```
Example response:
```
{
    "message": "Successfully modify Pair",
    "data": {
        "_id": "620ab153766c63815fcfb13c",
        "pair": "EURUSD",
        "originalRate": 1.129261,
        "fee": 0.03,
        "feeAmount": 0.034925597938144336,
        "rateWithMarkUpFee": 1.1641865979381445,
        "__v": 0
    }
}
```

### Get all rates
-  _GET -> /rates_

Example response:
```
[
    {
        "_id": "620ab7ead12f12c937b38fac",
        "pair": "EURUSD",
        "originalRate": 1.13494,
        "fee": 0.03,
        "feeAmount": 0.035101237113402066,
        "rateWithMarkUpFee": 1.1700412371134021,
        "__v": 0
    },
    {
        "_id": "620ab7ead12f12c937b38fad",
        "pair": "EURARS",
        "originalRate": 120.803029,
        "fee": 0.03,
        "feeAmount": 3.736176154639175,
        "rateWithMarkUpFee": 124.53920515463918,
        "__v": 0
    },
    {
        "_id": "620ab7ead12f12c937b38fae",
        "pair": "USDARS",
        "originalRate": 106.44001356899923,
        "fee": 0.03,
        "feeAmount": 3.2919591825463677,
        "rateWithMarkUpFee": 109.7319727515456,
        "__v": 0
    },
    {
        "_id": "620ab7ead12f12c937b38faf",
        "pair": "EURBRL",
        "originalRate": 5.962951,
        "fee": 0.03,
        "feeAmount": 0.18442116494845362,
        "rateWithMarkUpFee": 6.147372164948454,
        "__v": 0
    },
    {
        "_id": "620ab7ead12f12c937b38fb0",
        "pair": "USDBRL",
        "originalRate": 5.253979064972597,
        "fee": 0.03,
        "feeAmount": 0.16249419788575042,
        "rateWithMarkUpFee": 5.416473262858347,
        "__v": 0
    },
    {
        "_id": "620ab7ead12f12c937b38fb1",
        "pair": "BRLARS",
        "originalRate": 20.258933705811096,
        "fee": 0.03,
        "feeAmount": 0.626564959973539,
        "rateWithMarkUpFee": 20.885498665784635,
        "__v": 0
    }
]
```
-----------
### Other info

- Added swagger the endpoint is "/documentation".
- Added postman collection in dir -> doc.

