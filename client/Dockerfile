# Base de Node.js versión 18
FROM node:18

# Crear directorio de aplicación
RUN mkdir -p /home/app

# Cambiar a la carpeta de la aplicación
WORKDIR /home/app

# Copiar el package.json y yarn.lock para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN yarn install

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["yarn", "dev"]
