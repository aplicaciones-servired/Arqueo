# Base de Node.js versión 18
FROM node:slim

# Crear directorio de aplicación
RUN mkdir -p /home/app

# Cambiar a la carpeta de la aplicación
WORKDIR /home/app

# Instalar dependencias
COPY package*.json ./
RUN yarn && yarn build

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "dev"]
