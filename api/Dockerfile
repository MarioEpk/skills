FROM amazoncorretto:11.0.8

MAINTAINER "Jan Bártl <jan.bartl@morosystems.cz">

ARG JAR_FILE
ARG ENVIRONMENT=dev
RUN mkdir /app
WORKDIR /app

COPY ${JAR_FILE} app.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=${ENVIRONMENT}"]
