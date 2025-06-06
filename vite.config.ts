import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Use a number conversion for process.env.VITE_PORT
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000, // Ensure the port is a number
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
