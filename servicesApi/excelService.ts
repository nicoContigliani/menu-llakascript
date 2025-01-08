import xlsx from "xlsx";
import clientPromise from "../utils/mongodb";

export async function readAndInsertExcelData(filePath: string, folderName: string, fileName: string, latitude: string, longitude: string) {
    const workbook = xlsx.readFile(filePath);
    const allSheetData: { [key: string]: any[] } = {};

    workbook.SheetNames.forEach((sheetName) => {
        allSheetData[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    });
    
    console.log("🚀 ~ readAndInsertExcelData ~ allSheetData:", allSheetData)
    const client = await clientPromise;
    const db = client.db("menuDB");
    const companies = db.collection("companies");

    const companyName = fileName;
    const existingCompany = await companies.findOne({ companyName });

    if (existingCompany) {
        // Actualizar la empresa existente
        await companies.updateOne(
            { companyName },
            {
                $set: {
                    folderName,
                    hojas: allSheetData,
                    updateAt: new Date()  // Actualiza el campo 'updateAt' con la fecha actual
                }
            }
        );
        console.log(`Updated existing company: ${companyName}`);
    } else {
        // Insertar una nueva empresa
        await companies.insertOne({
            companyName,
            folderName,
            hojas: allSheetData,
            status_Companies: true,
            visits: 0,
            licence: [],
            infoVisits: [],
            loyaltyProgram: [],
            delivery: [],
            trafficStats: [],
            marketingCampaigns: [],
            giftCards: [],
            badcustomer:[],
            godcustomer:[],
            raiting:0,
            latitude,
            longitude,
            createAt: new Date(),
            updateAt: new Date()  // Establecer 'updateAt' en el momento de la inserción
        });
        console.log(`Inserted new company: ${companyName}`);
    }

    return { companyName, hojas: allSheetData };
}



// Datos de la empresa
// contactInfo: Detalles de contacto de la empresa.
// Teléfono.
// Correo electrónico.
// Dirección física.
// businessHours: Horarios de atención.
// Días y horas de operación.
// Notas especiales (por ejemplo, cerrado por vacaciones).
// socialLinks: Enlaces a redes sociales.
// Facebook, Instagram, Twitter, etc.
// Gestión del menú
// categories: Categorías de los productos en el menú.
// Ejemplo: Bebidas, Platos principales, Postres.
// menuItems: Detalles de cada elemento del menú.
// Nombre.
// Precio.
// Descripción.
// Ingredientes.
// Estado (disponible o agotado).
// Imagen del platillo.
// Gestión de operaciones
// employeeInfo: Información sobre empleados.
// Nombre, rol, y horario asignado.
// orders: Historial de pedidos.
// Fecha y hora.
// Detalles del pedido (productos, cantidad, precio total).
// Método de pago (efectivo, tarjeta, etc.).
// Estado del pedido (pendiente, entregado, cancelado).
// Estadísticas y analítica
// salesData: Datos de ventas.
// Ventas diarias, semanales, mensuales.
// Productos más vendidos.
// customerReviews: Opiniones de clientes.
// Puntuación promedio.
// Comentarios.
// Gestión de licencias y suscripciones
// licenceDetails:
// Tipo de licencia (gratuita, premium).
// Fecha de vencimiento.
// Estado de renovación.
// Marketing
// promotions:
// Promociones activas.
// Fecha de inicio y fin.
// loyaltyProgram:
// Detalles del programa de fidelidad.
// Puntos acumulados por cliente.
// Seguimiento de ubicación y tráfico
// geoData:
// Latitud y longitud.
// Áreas de influencia (zonas de entrega permitidas).
// trafficStats:
// Visitantes únicos.
// Tiempo promedio en la página.
