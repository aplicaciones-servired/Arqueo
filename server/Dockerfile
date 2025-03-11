# Base de Node.js versión 18
FROM node:slim

# Cambiar a la carpeta de la aplicación
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript antes de ejecutar la aplicación
RUN yarn build

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start"]
