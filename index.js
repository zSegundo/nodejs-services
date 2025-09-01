// api/index.js - Servicio Hola Mundo para Vercel
export default function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method, query } = req;
    const path = req.url.split('?')[0];

    if (path === '/api' && method === 'GET') {
        // Ruta principal - Hola Mundo básico
        const nombre = query.nombre || 'Mundo';
        
        res.status(200).json({
            mensaje: `¡Hola ${nombre}!`,
            timestamp: new Date().toISOString(),
            version: "1.0.0"
        });

    } else if (path === '/api/info' && method === 'GET') {
        // Información del servicio
        res.status(200).json({
            servicio: "Hola Mundo API",
            version: "1.0.0",
            descripcion: "Servicio básico de saludo en Node.js",
            endpoints: {
                "/api": "Mensaje de hola mundo básico",
                "/api?nombre=TuNombre": "Saludo personalizado",
                "/api/info": "Información del servicio"
            }
        });

    } else if (path === '/api' && method === 'POST') {
        // POST endpoint
        const { nombre = 'Usuario' } = req.body || {};
        
        res.status(200).json({
            mensaje: `¡Hola ${nombre}! Recibimos tu mensaje.`,
            datosRecibidos: req.body,
            timestamp: new Date().toISOString()
        });

    } else {
        // Ruta no encontrada
        res.status(404).json({
            error: "Ruta no encontrada",
            path: path,
            timestamp: new Date().toISOString()
        });
    }
}
