# Utiliza la imagen oficial de Node.js basada en Alpine por ser ligera
FROM node:alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instala las dependencias del proyecto. Considera usar `npm ci` si tienes un package-lock.json para una instalación más rápida y segura
RUN npm install

# Copia el resto de los archivos de tu proyecto al directorio de trabajo del contenedor
COPY . .

# Expone el puerto 3000 que Next.js usa por defecto
EXPOSE 3000

# Ejecuta tu aplicación Next.js en modo de desarrollo
CMD ["npm", "run", "dev"]
