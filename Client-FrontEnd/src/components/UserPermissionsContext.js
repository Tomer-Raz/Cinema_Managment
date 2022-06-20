import React, { createContext, useState } from "react";

//using this file we will be able to edit the permissions.json file from different components

export const PermissionsContext = createContext();

export const PermissionsContextProvider = (props) => {
	const [permissions, setPermissions] = useState([]);
	return (
		<PermissionsContext.Provider value={[permissions, setPermissions]}>
			{props.children}
		</PermissionsContext.Provider>
	);
};
