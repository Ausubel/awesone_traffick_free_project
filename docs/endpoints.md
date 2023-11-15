# ENDPOINTS - TRANSFERMARKET

## 1. Retorna todos los jugadores
### __GET__ */api/players*
#### BODY RESPONSE
```json
{
	"message": "Success",
	"data": [
        {
            "id": 1,
            "firstName": "Cristiano",
            "lastName": "Ronaldo",
            "dateOfBirth": "1985-02-05T05:00:00.000Z",
            "marketValue": "100000000.00"
        },
    ]	
}
```
## 2. Registra a un jugador
### __POST__ */api/players/register* 1
#### BODY RESPONSE
```json
{
        "firstName": "Pepde",
        "lastName": "Vloz",
        "dateOfBirth": "2020-01-01",
        "marketValue": 100,
        "countryId": 1
}
```
#### BODY RESPONSE
```json
{
	"message": "Success",
	"data": null
}
```
## 3. Retorna todos los jugadores por su nombre
### __GET__ */api/players/?name*
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "firstName": "Cristiano",
            "lastName": "Ronaldo",
            "dateOfBirth": "1985-02-05T05:00:00.000Z",
            "marketValue": "100000000.00",
            "currentAgent": "Agent 1",
            "country": "Spain",
            "careerStatistics": {
                "goals": 10,
                "assists": 5,
                "matches": 20
            }
        },
        {
            "id": 4,
            "firstName": "AntiCristiano",
            "lastName": "Ronaldo",
            "dateOfBirth": "1985-02-05T05:00:00.000Z",
            "marketValue": "100000000.00",
            "currentAgent": "Agent 1",
            "country": "Spain",
            "careerStatistics": {
                "goals": 10,
                "assists": 5,
                "matches": 20
            }
        }
    ]
}
```
## 4. Retorna todos los jugadores por su equipo
### __GET__ */api/players/team/{name}*
#### BODY RESPONSE
```json
{
	"message": "Success",
	"data": [
        {
            "id": 1,
            "firstName": "Cristiano",
            "lastName": "Ronaldo",
            "dateOfBirth": "1985-02-05T05:00:00.000Z",
            "marketValue": "100000000.00"
        },
        {
            "id": 2,
            "firstName": "Lionel",
            "lastName": "Messi",
            "dateOfBirth": "1987-06-24T05:00:00.000Z",
            "marketValue": "120000000.00"
        },
    ]	
}
```
## 5. Modifica las caracteristicas de un jugador por el id del jugador
### __GET__ */api/players/:id/update-stats*
#### BODY RESPONSE
```json
{
        "firstName": "Pepde",
        "lastName": "Vloz",
        "dateOfBirth": "2020-01-01",
        "marketValue": 100,
        "countryId": 1
}
```
#### BODY RESPONSE
```json
{
	"message": "Success",
	"data": [
        {
            "id": 1,
            "firstName": "Cristiano",
            "lastName": "Ronaldo",
            "dateOfBirth": "1985-02-05T05:00:00.000Z",
            "marketValue": "100000000.00"
        },
        {
            "id": 2,
            "firstName": "Lionel",
            "lastName": "Messi",
            "dateOfBirth": "1987-06-24T05:00:00.000Z",
            "marketValue": "120000000.00"
        },
    ]	
}
```
## 6. Retorna todos los equipos
### __GET__ */api/teams*
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": [
        {
            "teamName": "Real Madrid",
            "budget": "50000000.00",
            "country": "Spain",
            "league": "La Liga"
        },
    ]
}
```
## 7. Crea un equipo
### __GET__ */api/teams/register*
#### BODY REQUEST
```json
{
    "teamName": "Equipo 100000",
    "budget": "40000000",
    "countryId": 1,
    "leagueId": 1
}
```
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": null
}

```
## 8. Obtener las transferencias de un equipo por su id
### __GET__ *api/transfer/{id}*
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "transfertDate": "2022-01-01T05:00:00.000Z",
            "transfertFee": "5000000.00",
            "contractDurationSeasons": 1,
            "realeaseClause": "7500000.00",
            "originalTeamId": 1,
            "newTeamId": 2
        },
        {
            "id": 2,
            "transfertDate": "2022-02-01T05:00:00.000Z",
            "transfertFee": "4000000.00",
            "contractDurationSeasons": 2,
            "realeaseClause": "6000000.00",
            "originalTeamId": 2,
            "newTeamId": 3
        }
    ]
}
```
### __GET__ *api/player_contracts/{id}*
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "transfertDate": "2022-01-01T05:00:00.000Z",
            "transfertFee": "5000000.00",
            "contractDurationSeasons": 1,
            "realeaseClause": "7500000.00",
            "originalTeamId": 1,
            "newTeamId": 2
        },
        {
            "id": 2,
            "transfertDate": "2022-02-01T05:00:00.000Z",
            "transfertFee": "4000000.00",
            "contractDurationSeasons": 2,
            "realeaseClause": "6000000.00",
            "originalTeamId": 2,
            "newTeamId": 3
        }
    ]
}
```
### __PUT__ *api/player_contracts/{id}/register*
#### BODY REQUEST
```json
{
    "startDate": "2022-01-01",
    "endDate": "2023-01-01",
    "salary": 5000000,
    "realeaseClause": 7500000,
    "teamId": 1
}
```
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": null
}
```
### __GET__ *api/auth/sing-in*
#### BODY REQUEST
```json
{
    "username": "admin",
    "password": "admin"
}
```
#### BODY RESPONSE
```json
{
    "message": "Success",
    "data": {
        "user": [
            {
                "name": "admin",
                "lastName": "admin",
                "userName": "admin",
                "roleId": 1
            }
        ],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZUlkIjoxLCJpYXQiOjE3MDAwNjUxMDAsImV4cCI6MTcwMDIzNzkwMH0.Ffw0-iQqQ9LtW1Q2dTrWX7CZqWHEby-sO9sS7Q5dZBk"
    }
}
```
### __POST__ */register/guest*
#### BODY REQUEST
```json
{
    "name": "Ausubel",
    "lastName": "Velasquez",
    "userName": "ausubelvc",
    "password": "intelectus135"
}
```
#### BODY RESPONSE
```json
{
    "message": "Created",
    "data": null
}
```
### __POST__ */register/agent*
#### BODY REQUEST
```json
{
    "name": "Cristina",
    "lastName": "Ronalda",
    "userName": "chist",
    "password": "007"
}
```
#### BODY RESPONSE
```json
{
    "message": "Created",
    "data": null
}
```


