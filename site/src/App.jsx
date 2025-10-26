// site/src/App.jsx

import React from "react";
import Simulacao from "./pages/Simulacao.jsx";

export default function App() {
  // App agora só delega à página principal (sem BrowserRouter)
  return <Simulacao />;
}
