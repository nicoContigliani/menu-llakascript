// export const fetchData = async (data: any[] | any | null, methods: string, url: string) => {
//     try {
//         const response = await fetch(url, {
//             method: methods,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data) || null,
//         });

//         const result = await response.json();

//         return {
//             ok: response.ok,
//             data: result.data || null,
//             error: result.error || null,
//             message: result.message || null,
//         };
//     } catch (error: any) {
//         console.error("🚀 ~ Error en fetchData:", error);
//         return {
//             ok: false,
//             data: null,
//             error: error.message || "Error desconocido",
//         };
//     }
// };
export const fetchData = async (
    method: string,
    url: string,
    data?: any[] | any | null,
    id?: string | number // Opcional, para manejar endpoints con IDs
) => {
    try {
        // Si hay un ID, se agrega al URL
        const endpoint = id ? `${url}/${id}` : url;

        // Configuración básica del fetch
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        // Agregar el cuerpo si el método requiere body y data no es nulo
        if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && data) {
            options.body = JSON.stringify(data);
        }

        // Hacer la solicitud
        const response = await fetch(endpoint, options);

        // Manejar la respuesta
        const result = await response.json();

        return {
            ok: response.ok,
            data: result.data || null,
            error: result.error || null,
            message: result.message || null,
        };
    } catch (error: any) {
        console.error("🚀 ~ Error en fetchData:", error);
        return {
            ok: false,
            data: null,
            error: error.message || "Error desconocido",
        };
    }
};
