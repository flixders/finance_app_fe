import { Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const activeLinkStyles = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "blue.600",
  };

  return (
    <Flex as="nav" align="center" padding="1rem" marginLeft={"50px"}>
      <Flex gap={4}>
        <Link
          as={NavLink}
          to="/registratie"
          fontSize="3xl"
          _hover={{
            color: "blue.400",
          }}
          _activeLink={activeLinkStyles}
          className="nav-link"
          color="black.600" // Grey color
          mr={4}
        >
          Registratie
        </Link>
        <Link
          as={NavLink}
          to="/overzicht"
          fontSize="3xl"
          _hover={{
            color: "blue.400",
          }}
          _activeLink={activeLinkStyles}
          className="nav-link"
          color="black.600" // Grey color
        >
          Overzicht
        </Link>
      </Flex>
    </Flex>
  );
}

export default Navbar;
