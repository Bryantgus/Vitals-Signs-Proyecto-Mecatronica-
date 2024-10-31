//Comando para compilar y monitorear el codigo: pio run --target upload && pio device monitor

#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
WebServer server(80);
Preferences wifiGuardado;
int esperandoConexion = 0;
// Configura el SSID y la contraseña del punto de acceso
const char* ssidEsp32 = "Vitals Signs";
const char* passwordEsp32 = "12345678";

// HTML que se mostrará en la página web
const char* htmlPage = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
    <title>Página del ESP32</title>
    <style>
        body { background-color: lightblue; }
        h1 { color: navy; text-align: center; }
        ul { list-style-type: none; }
    </style>
</head>
<body>
    <h1>Selecciona una Red WiFi</h1>
    <form action="/guardar" method="POST">
        <ul id="wifiList">
            %WIFILIST%
        </ul>
        <input type="submit" value="Guardar Selección">
    </form>
    <p>Esta página se sirve desde el ESP32 en modo AP.</p>
</body>
</html>
)rawliteral";


void chequeoDeConexionWifi() {
    
    wifiGuardado.begin("ssid_password", false);
    bool keyExiste = wifiGuardado.isKey("ssid");
    
    if (keyExiste == false) {
        wifiGuardado.begin("ssid_password", false);
        wifiGuardado.putString("ssid", "Aqui se almacenara el ssid");
        wifiGuardado.putString("password", "Aqui se almacenara la contraseña");
        Serial.println("nameSpaceCreado");
    } 
    String ssid_value = wifiGuardado.getString("ssid");
    wifiGuardado.putString("password", "48575443C4E3B99EA");
    String password_value = wifiGuardado.getString("password");

    WiFi.begin(ssid_value, password_value);
    wifiGuardado.end();

    while(WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
        esperandoConexion ++;

    //Al llegar a 11 rompera el intento de conexion a wifi lo cual significa ha pasado bastante tiempo para establecer la conexión
        if (esperandoConexion == 11) { 
            break;
        }
    }

}
void configuracionWifi() {
    WiFi.softAP(ssidEsp32, passwordEsp32);
    Serial.println("");
    Serial.println("Conexion Fallida");
    Serial.println("Punto de acceso iniciado");
    Serial.print("IP del AP: ");
    Serial.println(WiFi.softAPIP());

    //Maneja la ruta raiz de la pagina y se le pasa el html/css
    server.on("/", []() {
        server.send(200, "text/html", htmlPage);
    });


server.begin();
    Serial.println("Servidor iniciado");
}

void escanearRedesWiFi() {
    String listaRedes = "";
    int numRedes = WiFi.scanNetworks();
    for (int i = 0; i < numRedes; i++) {
        htmlPage += "<li><input type='radio' name='ssid' value='" + WiFi.SSID(i) + "'>" + WiFi.SSID(i) + "</li>";
    }
    Serial.print(listaRedes);
    
}

void setup() {
    Serial.begin(115200);
    escanearRedesWiFi();
    // chequeoDeConexionWifi();

    // if (esperandoConexion < 10) {
    //     //Conexion exitosa
    //     //Procede el envio de datos mediando HTTP    
    //     Serial.println("WiFi connected successfully");

    // } else if (esperandoConexion > 10) {
    //     //Conexion fallida e inicia el web server para configurar la red wifi
    //     configuracionWifi();    
    //     }
    

}
void loop() {
    // server.handleClient(); // Escucha solicitudes del cliente
}
