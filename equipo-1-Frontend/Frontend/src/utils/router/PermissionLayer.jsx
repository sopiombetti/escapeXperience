import Unauthorized from "pages/router/Unauthorized";
import { Outlet } from "react-router-dom";
import { USER_ATTRIBUTES } from "utils";
import { useUser } from "../ctx/user.ctx";

const PermissionLayer = ({necessaryRoleLevel}) => {
    const { user } = useUser();
    const isNecessaryRoleLevel = necessaryRoleLevel ? necessaryRoleLevel.includes(user ? user[USER_ATTRIBUTES.ROLE] : "Guest") : true
    return isNecessaryRoleLevel ? <Outlet /> : <Unauthorized />;
}

export default PermissionLayer;