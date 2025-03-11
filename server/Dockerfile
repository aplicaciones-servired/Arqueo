# Base de Node.js versión 18
FROM node:slim

# Cambiar a la carpeta de la aplicación
WORKDIR /app

# Instalar dependencias
COPY . .

RUN npm install && node --run build

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
