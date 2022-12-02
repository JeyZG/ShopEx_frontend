import React from "react";
import ReactDOM from "react-dom/client";
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';         // Quitar esto para restablecer diseño anterior
//import "@fortawesome/fontawesome-free/css/all.min.css"; // Quitar esto para restablecer diseño anterior
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
	<Toaster
		position="top-center"
		reverseOrder={false}
		gutter={8}
		containerClassName=""
		containerStyle={{}}
		toastOptions={{
			// Define default options
			className: '',
			duration: 4000,
			style: {
			background: '#363636',
			color: '#fff',
			},

			// Default options for specific types
			success: {
				duration: 3000,
				theme: {
					primary: 'green',
					secondary: 'black',
				},
			},
			
		}}
		/>
	  <App />
	
  </Provider>
);
