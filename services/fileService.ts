export const fetchFileList = async () => {
    console.log("Iniciando consulta de archivos...");
    try {
      const response = await fetch('/api/listFiles');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const files = await response.json();
      console.log("Archivos obtenidos:", files);
      return files;
    } catch (error) {
      console.error('Error al obtener la lista de archivos:', error);
      return [];
    }
  };