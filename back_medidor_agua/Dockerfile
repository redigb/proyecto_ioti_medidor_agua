FROM eclipse-temurin:21-jdk-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar el JAR compilado
COPY target/*.jar app.jar

# Expone el puerto de tu app Spring Boot
EXPOSE 3050

# Ejecuta la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]