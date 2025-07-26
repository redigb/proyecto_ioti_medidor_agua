#include <Arduino.h>


#define RED_LED 21
#define YELLOW_LED 22
#define GREEN_LED 23

int distance; // valor simulado de distancia

void setup() {
  Serial.begin(115200);

  pinMode(RED_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
}

void loop() {
  distance = 5;  // ← Cambia esto: prueba con 110, 25, 15, 8, etc.

  Serial.print("Distancia simulada: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Lógica de LEDs simulada
  if (distance <= 10) {
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, LOW);
  }
  else if (distance > 10 && distance <= 20) {
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, HIGH);
    digitalWrite(RED_LED, LOW);
  }
  else {
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, HIGH);
  }

  delay(2000); // Espera 2 segundos antes de repetir
}
