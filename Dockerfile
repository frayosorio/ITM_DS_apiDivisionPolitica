FROM node:16
# Crear carpeta para la aplicación
WORKDIR /usr/src/app
# Instalar dependencias
# Se usa un comodín para garantizar que ambos package.json Y package-lock.json sean copiados
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# fuente de la aplicacion completo
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]