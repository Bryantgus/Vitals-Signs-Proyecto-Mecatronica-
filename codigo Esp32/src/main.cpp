#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>

WebServer server(80);
Preferences wifiGuardado;
int esperandoConexion = 0;
const int TEC = 4;
const char* ssidEsp32 = "Vitals Signs";
const char* passwordEsp32 = "12345678";

String listaRedes = "";  


const char* htmlPage = R"rawliteral(
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESP32 WiFi Selector</title>
    <style>
        body {
            background: linear-gradient(270deg, #77ecce, #095594);
            background-size: 400% 400%;
            animation: backgroundShift 45s ease infinite;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            overflow: hidden;
        }

        @keyframes backgroundShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .form-container {
            background-color: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 400px;
            text-align: center;
        }

        h1 {
            color: white;
            text-align: center;
            font-size: 28px;
            margin-bottom: 20px;
            margin-top: 20px;
        }

        h2 {
            color: #095594;
            margin-bottom: 15px;
            font-size: 22px;
        }

        ul {
            list-style-type: none;
            padding: 0;
            text-align: left;
            margin-bottom: 15px;
        }

        li {
            margin-bottom: 10px;
            font-size: 20px;
        }

        input[type="password"] {
            width: 100%;
            padding: 15px; /* Aumentar el padding */
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 18px; /* Aumentar el tamaño de la fuente */
        }


        input[type="submit"] {
            padding: 10px 15px;
            background-color: #095594;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
        }

        input[type="submit"]:hover {
            background-color: #074477;
        }
    </style>
</head>
<body>
    <h1>Vitals Signs</h1>
    <div class="form-container">
        <h2>Selecciona la Red WiFi</h2>
        <form action="/guardar" method="POST">
            <ul id="wifiList">
                %WIFILIST%
            </ul>
            <input type="password" name="password" placeholder="Introduce la contraseña" required>
            <input type="submit" value="Guardar Selección">
        </form>
    </div>
</body>
</html>


)rawliteral";

void chequeoDeConexionWifi() {
    wifiGuardado.begin("ssid_password", false);
    bool keyExiste = wifiGuardado.isKey("ssid");

    if (!keyExiste) {
        wifiGuardado.putString("ssid", "Aqui se almacenara el ssid");
        wifiGuardado.putString("password", "Aqui se almacenara la contraseña");
        Serial.println("nameSpaceCreado");
    }
  
    String ssid_value = wifiGuardado.getString("ssid");
    String password_value = wifiGuardado.getString("password");

    WiFi.begin(ssid_value.c_str(), password_value.c_str());
    wifiGuardado.end();

    while(WiFi.status() != WL_CONNECTED && esperandoConexion < TEC) {
        delay(1000);
        Serial.print(".");
        esperandoConexion++;
    }
}

void escanearRedesWiFi() {
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);
    Serial.println("Escaneando redes Wi-Fi...");

    listaRedes = ""; // 
    int numRedes = WiFi.scanNetworks();
    if (numRedes == 0) {
        Serial.println("No se encontraron redes.");
        listaRedes = "<li>No se encontraron redes.</li>";
    } else {
        for (int i = 0; i < numRedes; i++) {
            listaRedes += "<li><input type='radio' name='ssid' value='" + WiFi.SSID(i) + "'>" + WiFi.SSID(i) + "</li>";
        }
    }
}
void webConfigWifi() {
      WiFi.softAP(ssidEsp32, passwordEsp32);
    Serial.print("IP del AP: ");
    Serial.println(WiFi.softAPIP());

    server.on("/", []() {
        String paginaConLista = htmlPage;
        paginaConLista.replace("%WIFILIST%", listaRedes);
        server.send(200, "text/html", paginaConLista);
    });

    server.on("/guardar", HTTP_POST, []() {
        String ssidSeleccionado = server.arg("ssid");
        String passwordIngresado = server.arg("password");
        
        Serial.println("SSID seleccionado: " + ssidSeleccionado);
        Serial.println("Contraseña ingresada: " + passwordIngresado);
        
        // Guardar en Preferences
        wifiGuardado.begin("ssid_password", false);
        wifiGuardado.putString("ssid", ssidSeleccionado);
        wifiGuardado.putString("password", passwordIngresado);
        wifiGuardado.end();

        server.send(200, "text/html", "<h1>Configuración guardada</h1>");
    });

    server.begin();
    Serial.println("Servidor iniciado");
}

void setup() {
    Serial.begin(115200);
    delay(1000);
    chequeoDeConexionWifi();

    if (esperandoConexion < TEC) {
        Serial.println("WiFi connected successfully");
    } else {
        escanearRedesWiFi();
        webConfigWifi();
    }

}

void loop() {
    server.handleClient();
}
