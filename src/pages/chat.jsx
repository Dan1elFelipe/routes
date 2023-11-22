export const createConnection = (serverUrl, roomId) => {
    // Una aplicación real se conectaría al servidor
    return {
      connect() {
        console.log('✅ Conectando a la sala "' + roomId + '" en ' + serverUrl + '...');
      },
      disconnect() {
        console.log('❌ Desconectado de la sala "' + roomId + '" en ' + serverUrl);
      }
    };
  }