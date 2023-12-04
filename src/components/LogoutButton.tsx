import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon from React Icons

const LogoutButton = () => {
  const handleLogout = () => {
    console.log("Logout button clicked!"); // Ensure this log message appears in the console
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <Button
      onClick={handleLogout}
      position="absolute"
      top="10px"
      right="10px"
      colorScheme="red"
      variant="outline"
      leftIcon={<FiLogOut />} // Add the logout icon to the button
      zIndex="999" // Set a high z-index value to ensure it's on top
      _hover={{ cursor: "pointer" }} // Apply hover effect
    >
      Log uit
    </Button>
  );
};

export default LogoutButton;
