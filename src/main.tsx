// src/main.tsx
import React from "react"; // Re-import React for React.StrictMode
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"; // Re-import ChakraProvider and defaultSystem
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("rootElement is null");
}

const root = createRoot(rootElement);
root.render(
	<React.StrictMode>
		{" "}
		{/* Re-added React.StrictMode */}
		<ChakraProvider value={defaultSystem}>
			{" "}
			{/* Re-added ChakraProvider */}
			<App />
		</ChakraProvider>
	</React.StrictMode>,
);
