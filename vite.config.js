import { defineConfig } from 'vite';
import angular from 'vite-plugin-angular';

export default defineConfig({
  server: {
    host: '0.0.0.0',   // Allows access from other devices on the network
    port: 3000,         // Change this to your desired development port
    hmr: {
      host: '172.16.4.89',  // IP address for HMR
      port: 3000            // Same port as your Vite server
    },
    proxy: {
      '/incidentHub': {
        target: 'http://172.16.4.89:9000', // Point to your backend server
        changeOrigin: true,
        secure: false,                    // Set to true if your backend uses HTTPS
      },

    },
  },
  plugins: [angular()],
});
