# Operacion Fuego de Quasar
## Para el desarrollo de la API se utilizó:

- NodeJS
- Express 
- MongoDB
- Algunas dependencias de npm

## Levantar la API Localmente

- _Accede a la carpeta_

```
cd operacion-fq-ml
```

- _Renombra el archivo .env.example a .env y configurarlo con los datos del servidor_
 ```
MONGODB_URI=mongodb+srv://TuBdURL
SECRET=ClaveDeSeguridadToken
SATELLITE_ONE=kenobi
SATELLITE_TWO=skywalker
SATELLITE_THREE=sato
```

- _Instala las dependencias_

```
npm install
```

- _Corré el proyecto en desarrollo_

```
npm run dev
```

- _Corré el proyecto en productivo_

```
npm start
```

- _Corrér Test_

```
npm run test
```

# API Productiva

- _Ruta_

```
https://meli-operacionfdq.herokuapp.com/
```
- _Api hosteada en Heroku, y la base de datos en MongoDB Atlas_

## Crear un usuario o logearse
- _Para realizar las pegadas necesitas registrarte o logearte ya que utiliza tokens y roles_
### Registro de usuario 
-  _POST -> /api/auth/signup_
Roles actuales "tripulante" y "general"
```
https://meli-operacionfdq.herokuapp.com/api/auth/signup
```
Ejemplo request:
```
{
	"username": "user",
	"email": "email@email.com",
	"password":"password",
    	"roles": ["general"]
}
```
Ejemplo response:
```
{
    "message": "User created successfully",
    "token": "TOKEN"
}
```

### Login de usuario
-  _POST -> /api/auth/signin_
```
https://meli-operacionfdq.herokuapp.com/api/auth/signin
```
Ejemplo request:
```
{
 "email":"user@email.com",
 "password":"password"
}
```
Ejemplo response:
```
{
    "message": "Welcome user",
    "token": "TOKEN"
}
```

--------
### Rutas del ejercicio
### Aclaracion
- Solo pueden acceder a esta informacion si tiene el rol de "general"
- Se debe colocar en los headers la siguiente informacion
```
"ml-access-token": "TOKEN"
"Content-Type": "application/json"
```

### TopSecret
-  _POST -> /api/topsecret/_
```
https://meli-operacionfdq.herokuapp.com/api/topsecret/
```
Ejemplo request:
```
{
  "satellites": [
    {
      "name": "kenobi",
      "distance": 100.0,
      "message": ["","este","es","un","mensaje"]
    },
    {
      "name": "skywalker",
      "distance": 115.5,
      "message": ["este","","un","mensaje"]
    },
    {
      "name": "sato",
      "distance": 142.7,
      "message": ["","","es","","mensaje"]
    }
  ]
}
```
Ejemplo response: (RESPONSE CODE 200)
```
{
    "position": {
        "x": -16.2,
        "y": -58.2
    },
    "message": "este es un mensaje"
}
```

### TopSecret Split
-  _POST -> /api/topsecret_split/{satellite_name}_
-  Satelites en servicio: kenobi, skywalker, sato
```
https://meli-operacionfdq.herokuapp.com/api/topsecret_split/kenobi
```

Ejemplo request:
```
{
    "distance": 100.0,
    "message": [ "este", "", "", "mensaje", "" ]
}
```
Ejemplo response:
```
{
    "message": "Satellite modify successfully"
}
```

### TopSecret Split
-  _GET -> /api/topsecret_split/_
-  Deben estar los 3 satellites con la informacion cargada correctamente, sino respondera _"No hay suficiente informacion"_
```
https://meli-operacionfdq.herokuapp.com/api/topsecret_split/
```
Ejemplo response:
```
{
    "position": {
        "x": -16.2,
        "y": -58.2
    },
    "message": "este es un mensaje secreto"
}
```
-----------
### Mas informacion del proyecto

- Estructura de la API: (https://github.com/alexek-r/operacion-fq-ml/blob/main/doc/API.md)

