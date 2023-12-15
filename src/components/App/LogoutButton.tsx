import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon from React Icons
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  onLogoutSuccess: () => void;
}
const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwt-refresh");
    onLogoutSuccess();
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      position="absolute"
      top="30px"
      right="35px"
      colorScheme="red"
      variant="outline"
      leftIcon={<FiLogOut />}
      zIndex="999"
      _hover={{ cursor: "pointer" }}
    >
      Log uit
    </Button>
  );
};

export default LogoutButton;
