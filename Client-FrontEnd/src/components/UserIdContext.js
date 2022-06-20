import React, { createContext, useState } from "react";

//using this file we will be able to edit the permissions.json file from different components

export const IdContext = createContext();

export const IdContextProvider = (props) => {
	const [id, setId] = useState("");
	return (
		<IdContext.Provider value={[id, setId]}>
			{props.children}
		</IdContext.Provider>
	);
};
