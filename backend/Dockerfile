# Wybierz obraz bazowy z oficjalnego repozytorium Docker Hub dla Java 17
FROM openjdk:17

# Ustaw katalog roboczy na /app
WORKDIR /app

# Skopiuj plik JAR aplikacji Spring do kontenera
COPY target/bol-0.0.1-SNAPSHOT.jar /app/bol-0.0.1-SNAPSHOT.jar

# Domyślnie wystaw port 8080
EXPOSE 8080

# Uruchom aplikację Spring po uruchomieniu kontenera
CMD ["java", "-jar", "bol-0.0.1-SNAPSHOT.jar"]