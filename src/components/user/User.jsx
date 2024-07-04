import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./User.css";

const User = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    console.log("Pas de token");
    return null;
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }

  const { firstname, lastname } = decodedToken;

  const getInitials = () => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="user-info">
      <span className="user-initials">{getInitials()}</span>
      <span className="user-name">{`${firstname} ${lastname}`}</span>
    </div>
  );
};

export default User;
