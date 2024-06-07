import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@css": path.resolve(__dirname, "./src/Components/css"),
      "@icons": path.resolve(__dirname, "./src/Components/img"),
      "@redux": path.resolve(__dirname, "./src/Components/libs/redux"),
      "@reactQuery": path.resolve(
        __dirname,
        "./src/Components/libs/react-query/*"
      ),
    },
  },
});
