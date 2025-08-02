#include <Arduino.h>
#include "time.h"

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>  // Para Leer JSon 

#define RED_LED 21
#define YELLOW_LED 22
#define GREEN_LED 23

const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* dispositivosURL = "http://192.168.31.120:3050/api/dispositivos";
const char* medicionesURL = "http://192.168.31.120:3050/api/mediciones";

// Cambia esto por la MAC real del ESP32 si quieres
String esp32Mac = WiFi.macAddress();
// String esp32Mac = "MAC-AC-DEER-TES_ACAT";
String dispositivoId = "";

int distance; // valor simulado de distancia

// --- FUNCIONES AUXILIARES ---

String getFechaHora() {
  time_t now = time(nullptr);
  struct tm* timeinfo;
  time(&now);
  timeinfo = localtime(&now);
  char buffer[25];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S", timeinfo);
  return String(buffer);
}

void identificarDispositivo() {
  HTTPClient http;
  http.begin(dispositivosURL);
  int httpCode = http.GET();

  if (httpCode == 200) {
    String payload = http.getString();
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, payload);

    for (JsonObject dispositivo : doc.as<JsonArray>()) {
      String mac = dispositivo["esp32Mac"];
      if (mac == esp32Mac) {
        dispositivoId = dispositivo["id"].as<String>();
        Serial.println("Dispositivo identificado!");
        Serial.println("ID: " + dispositivoId);
        break;
      }
    }

    if (dispositivoId == "") {
      Serial.println("MAC no encontrada en el backend.");
    }
  } else {
    Serial.printf("Error al obtener dispositivos. Código: %d\n", httpCode);
  }

  http.end();
}

void enviarMedicion(int distancia, String nivel) {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(medicionesURL);
  http.addHeader("Content-Type", "application/json");

  DynamicJsonDocument doc(256);
  doc["dispositivoId"] = dispositivoId;
  doc["distancia"] = distancia;
  doc["volumen"] = distancia * 0.6;  // Fórmula de ejemplo
  doc["nivel"] = nivel;
  doc["fechaHora"] = getFechaHora();

  String body;
  serializeJson(doc, body);

  int httpCode = http.POST(body);
  if (httpCode == 200 || httpCode == 201) {
    Serial.println("Medición enviada correctamente.");
  } else {
    Serial.printf("Error al enviar medición. Código: %d\n", httpCode);
  }
  http.end();
}


// --- SETUP ---
void setup() {
  Serial.begin(115200);

  pinMode(RED_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

  // Conectar a WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado!");
  // Configura la zona horaria (ejemplo: Perú = UTC -5)
  configTime(-5 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  // Esperar a que se sincronice la hora
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Error al obtener la hora desde NTP");
    return;
  }

  Serial.println("Hora sincronizada correctamente.");

  identificarDispositivo();  // Buscar ID por MAC
}


// --- LOOP ---
void loop() {
  if (dispositivoId == "") {
    Serial.println("No se ha identificado el dispositivo aún.");
    delay(3000);
    return;
  }

  // Simular distancia aleatoria
  int distancia = random(5, 30);  // entre 5 y 30 cm
  String nivel = "";

  // Determinar nivel y encender LEDs  // ---  se tiene que modifciar segun el circuito!!
  if (distancia <= 10) {
    nivel = "LLENO";
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, LOW);
  } else if (distancia > 10 && distancia <= 20) {
    nivel = "MEDIO";
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, HIGH);
    digitalWrite(RED_LED, LOW);
  } else {
    nivel = "VACIO";
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, HIGH);
  }

  // Mostrar en consola
  Serial.printf("Distancia: %d cm | Nivel: %s\n", distancia, nivel.c_str());

  // Enviar POST de medición
  enviarMedicion(distancia, nivel);

  delay(5000); // cada 5 segundos
  // delay(120000); // Retraso de 2 minutos (120 segundos * 1000 ms/segundo)
 // delay(60000); // Retraso de 1 minuto (60 segundos * 1000 ms/segundo) -- recomendablw
}