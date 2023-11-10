# ENDPOINTS - TRANSFERMARKET

##  Retorna todos los jugadores 1
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
##  Registra a un jugador
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
##  Retorna todos los jugadores por su nombre
### __GET__ */api/players/?name* 1 
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
## Retorna todos los jugadores por su equipo
### __GET__ */api/players/team/{name}* 1
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
##  Retorna todos los equipos
### __GET__ */api/teams* 1
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
##  Crea un equipo
### __GET__ */api/teams/register* 1
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
### __GET__ *api/transfer/{id}* 1
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