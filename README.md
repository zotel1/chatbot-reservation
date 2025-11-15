# Sistema de Reservas Automatizado para Bar

Sistema completo de reservas con chatbot inteligente, pagos con Mercado Pago e integración con Google APIs.

## Características

- **Chatbot con RAG**: Utiliza Qdrant Cloud para buscar información y Gemini Flash 2.5 para respuestas contextualizadas
- **Sistema de Reservas**: Landing page atractiva con formulario completo
- **Pagos con Mercado Pago**: Seña de $10 ARS para confirmar reserva
- **Integraciones Google**:
  - Gmail: Notificaciones automáticas al cliente y encargado
  - Google Calendar: Eventos automáticos en el calendario del encargado
  - Google Sheets: Registro de todas las reservas

## Variables de Entorno Requeridas

Configura estas variables en tu panel de Vercel:

### Qdrant Cloud
\`\`\`
QDRANT_URL=https://tu-cluster.qdrant.io
QDRANT_API_KEY=tu_api_key
QDRANT_COLLECTION=bar_info
\`\`\`

### Google Gemini
\`\`\`
GEMINI_API_KEY=tu_gemini_api_key
\`\`\`

### Mercado Pago
\`\`\`
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
\`\`\`

### Google APIs
\`\`\`
# Gmail (usar App Password o OAuth2)
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=tu_app_password

# Google Calendar
GOOGLE_CALENDAR_ID=tu-calendar-id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Google Sheets
GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id

# Email del encargado
BAR_MANAGER_EMAIL=encargado@tubar.com
\`\`\`

## Configuración de Google APIs

### 1. Crear Service Account en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las APIs:
   - Gmail API
   - Google Calendar API
   - Google Sheets API
4. Crea una Service Account:
   - IAM & Admin → Service Accounts → Create Service Account
   - Descarga la clave JSON
5. Copia el contenido del JSON a la variable `GOOGLE_SERVICE_ACCOUNT_KEY`

### 2. Configurar Google Calendar

1. Abre Google Calendar
2. Crea un nuevo calendario o usa uno existente
3. Configuración del calendario → Compartir con personas específicas
4. Agrega el email de la service account con permisos de "Hacer cambios en los eventos"
5. Copia el Calendar ID (en configuración del calendario)

### 3. Configurar Google Sheets

1. Crea una nueva hoja de cálculo
2. Crea una hoja llamada "Reservas" con estos encabezados:
   - ID | Nombre | Email | Teléfono | Personas | Espacio | Fecha | Hora | Payment ID | Fecha Creación
3. Comparte la hoja con el email de la service account (con permisos de edición)
4. Copia el ID del spreadsheet (de la URL)

### 4. Configurar Gmail

**Opción 1: App Password (más fácil)**
1. Ve a tu cuenta de Google → Seguridad
2. Activa la verificación en dos pasos
3. App Passwords → Genera una nueva
4. Usa esta contraseña en `GMAIL_APP_PASSWORD`

**Opción 2: OAuth2 (más seguro para producción)**
- Configura OAuth2 en Google Cloud Console
- Implementa el flujo de autenticación

## Configurar Qdrant Cloud

1. Crea una cuenta en [Qdrant Cloud](https://cloud.qdrant.io)
2. Crea un nuevo cluster
3. Crea una colección llamada "bar_info"
4. Sube tus documentos (menú, horarios, promociones) con embeddings
5. Copia la URL del cluster y el API key

## Instalación Local

\`\`\`bash
# Instalar dependencias
npm install

# Instalar dependencias adicionales para Google APIs
npm install googleapis nodemailer

# Instalar Qdrant client
npm install @qdrant/js-client-rest

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
\`\`\`

## Flujo del Usuario

1. **Chatbot**: El usuario interactúa con el chatbot
   - Después de 10 mensajes o al escribir "reserva", aparece un modal
2. **Decisión**: El usuario elige reservar o ir a Instagram
3. **Landing**: Si elige reservar, ve la landing page con información
4. **Pago**: Hace clic en "Pagar seña" y es redirigido a Mercado Pago
5. **Formulario**: Después del pago exitoso, completa el formulario de reserva
6. **Confirmación**: Recibe confirmación y se envían todas las notificaciones

## Estructura del Proyecto

\`\`\`
app/
├── page.tsx                    # Página principal con chatbot
├── reservar/                   # Landing page de reservas
├── pagar/                      # Redirección a Mercado Pago
├── pago-exitoso/              # Página de confirmación de pago
├── formulario-reserva/        # Formulario de datos de reserva
├── reserva-confirmada/        # Confirmación final
└── api/
    ├── chat/                  # Endpoint del chatbot (RAG + Gemini)
    ├── mercadopago/           # Endpoints de Mercado Pago
    └── reserva/               # Crear reserva y ejecutar integraciones

components/
├── chat-interface.tsx         # Interfaz del chatbot
├── reservation-modal.tsx      # Modal de confirmación
└── ...                        # Otros componentes

lib/
└── google-services.ts         # Servicios de Google APIs
\`\`\`

## Notas de Implementación

- El código de Google APIs está preparado pero necesita las dependencias instaladas
- Para activar las integraciones, instala: `npm install googleapis nodemailer`
- Los logs con `[v0]` ayudan a debuggear el flujo
- El sistema usa sessionStorage para verificar el pago antes del formulario
- Mercado Pago incluye webhook para notificaciones de pago

## Personalización

- Modifica `components/reservation-benefits.tsx` para cambiar los espacios del bar
- Edita los colores en `app/globals.css` para tu marca
- Ajusta los horarios en `app/formulario-reserva/page.tsx`
- Personaliza los emails en `app/api/reserva/create/route.ts`

## Soporte

Para más información sobre las integraciones:
- [Mercado Pago Docs](https://www.mercadopago.com.ar/developers/es/docs)
- [Google Calendar API](https://developers.google.com/calendar/api)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Gmail API](https://developers.google.com/gmail/api)
- [Qdrant Docs](https://qdrant.tech/documentation/)
- [Gemini API](https://ai.google.dev/docs)
