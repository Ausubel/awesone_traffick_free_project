# ENDPOINTS - TRANSFERMARKET

##  Retorna todos los jugadores
### __GET__ */api/players*
#### BODY RESPONSE
```json
{
	"message": "SUCCESS",
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
##  Retorna todos los jugadores por su id
### __GET__ */api/players/{id}*
#### BODY RESPONSE
```json
{
	"message": "SUCCESS",
	"data": {
        "firstName": "Cristiano",
        "lastName": "Ronaldo",
        "dateOfBirth": "1985-02-05T05:00:00.000Z",
        "marketValue": "100000000.00"
    }
}
```
##  Retorna todos los jugadores por su equipo
### __GET__ */api/players/team*
#### BODY RESPONSE
```json
{
	"message": "SUCCESS",
	"data": {
        "firstName": "Cristiano",
        "lastName": "Ronaldo",
        "dateOfBirth": "1985-02-05T05:00:00.000Z",
        "marketValue": "100000000.00"
    }
}
```
##  Retorna todos los equipos
### __GET__ */api/teams*
#### BODY RESPONSE
```json
{
    "message": "SUCCESS",
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
##  Retorma un equipo por su nombre con sus jugadores
### __GET__ */api/teams/?name*
#### BODY RESPONSE
```json
{
    "message": "SUCCESS",
    "data": {
        "id": 1,
        "teamName": "Real Madrid",
        "budget": "50000000.00",
        "country": "Spain",
        "league": "La Liga",
        "players": [
            {
                "firstName": "Cristiano",
                "lastName": "Ronaldo",
                "dateOfBirth": "1985-02-05T05:00:00.000Z",
                "marketValue": "100000000.00"
            },
            {
                "firstName": "AntiCristiano",
                "lastName": "Ronaldo",
                "dateOfBirth": "1985-02-05T05:00:00.000Z",
                "marketValue": "100000000.00"
            }
        ]
    }
}
```
##  Crea un equipo
### __GET__ */api/teams/create*
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
    "message": "SUCCESS",
    "data": null
}

```
##  Obtener las transferencias de un equipo por su id
### __GET__ *api/transfer/{id}*
#### BODY RESPONSE
```json
{
    "message": "SUCCESS",
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