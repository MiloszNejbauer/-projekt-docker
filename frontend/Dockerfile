# Wybierz obraz bazowy z oficjalnego repozytorium Docker Hub dla Node.js 16 (LTS)
FROM node:16-alpine

# Ustaw katalog roboczy na /app
WORKDIR /app

# Skopiuj pliki aplikacji React do kontenera
COPY . /app

# Zainstaluj zależności aplikacji
RUN npm install

# Zbuduj aplikację React
RUN npm run build

# Domyślnie wystaw port 3000
EXPOSE 3000

# Uruchom serwer HTTP dla aplikacji React
CMD ["npm", "start"]