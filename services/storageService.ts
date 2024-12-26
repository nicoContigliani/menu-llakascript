// storageService.ts
export const saveToLocalStorage = (key: string, value: any, expirationInHours: number) => {
    const expirationTime = new Date().getTime() + expirationInHours * 60 * 60 * 1000; // 2 horas en milisegundos
    const data = {
      value,
      expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
  
    const parsedData = JSON.parse(data);
    const currentTime = new Date().getTime();
  
    // Verifica si los datos expiraron
    if (currentTime > parsedData.expirationTime) {
      localStorage.removeItem(key);
      return null;
    }
  
    return parsedData.value;
  };
  
  export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  