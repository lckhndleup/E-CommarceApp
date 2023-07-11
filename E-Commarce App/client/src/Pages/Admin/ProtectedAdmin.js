import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate, Outlet ,NavLink} from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";


function ProtectedAdmin() {
	const { user } = useAuth();

	return (
		<>
			{user?.role !== "admin" && <Navigate to={"/"} replace={true} />}
			<nav>
				<ul className="admin-menu">
					<li>
						<NavLink to={"/admin"}>Home</NavLink>
					</li>
					<li>
						<NavLink to={"/admin/orders"}>Orders</NavLink>
					</li>
					<li>
						<NavLink to={"/admin/products"}>Products</NavLink>
					</li>
				</ul>
			</nav>
			<Box mt={10}>
				<Outlet />
			</Box>
		</>
	);
}

export default ProtectedAdmin;