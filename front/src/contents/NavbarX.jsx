import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useState } from "react";
import Uho from "../assets/Uho.jpg";
import { useUserDetails } from "./UserContext";
import { useNavigate } from "react-router-dom";

export function NavbarX() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo, updateUserInfo } = useUserDetails();
  const navitae = useNavigate();
  return (
    <Navbar
      maxWidth="full"
      className=" text-white bg-blue-900 p-5 border"
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "flex flex-row justify-center",
      }}
      shouldHideOnScroll
      isBordered="true"
      isBlurred={false}
    >
      <NavbarContent
        justify="center"
        className=" md:relative right-8 ml-4 md:ml-0"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand className="space-x-4 min-w-28 ">
          <img src={Uho} className="" />
          <p className="hidden sm:flex font-bold text-inherit">
            Universidad de Holguín
          </p>
          <p className="sm:hidden font-bold text-inherit">Uho</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4 grow" justify="center">
        <Dropdown className=" xl:hidden">
          <NavbarItem className=" xl:hidden">
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base font-bold"
                radius="sm"
                variant="light"
              >
                Planes de trabajo<i className="fa fa-chevron-down"></i>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="autoscaling">
              <Link color="foreground" href="http://localhost:5173/makeplan">
                Nuevo Plan de trabajo
              </Link>
            </DropdownItem>
            <DropdownItem key="usage_metrics">
              <Link color="foreground" href="http://localhost:5173/listplans">
                Lista de planes de trabajo
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem className="hidden xl:flex xl:pl-150">
          <Link color="foreground" href="http://localhost:5173/makeplan">
            Nuevo Plan de trabajo
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden xl:flex xl:ml-20">
          <Link color="foreground" href="http://localhost:5173/listplans">
            Lista de planes de trabajo
          </Link>
        </NavbarItem>
      </NavbarContent>
      {userInfo.name === false ? (
        <NavbarContent justify="" className=" relative left-3">
          <NavbarItem className="hidden sm:flex">
            <Link href="http://localhost:5173/login">Iniciar sección</Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Button
              as={Link}
              color="primary"
              href="http://localhost:5173/register"
              variant="flat"
            >
              Registrarse
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="" className=" relative left-3">
          <NavbarItem className="hidden sm:flex">
            <Link href="http://localhost:5173/profile">
              <Avatar name={userInfo.name} />
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Button
              color="danger"
              onPress={() => {
                updateUserInfo(false, false);
                navitae("/login");
              }}
            >
              Desconectarse
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        <NavbarMenuItem key="blnk" className=" text-center">
          <Link
            color="primay"
            className="w-full"
            href="http://localhost:5173/#"
            size="lg"
          ></Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          key="makeplan"
          className=" text-center border-b-1 border-black"
        >
          <Link
            color="foreground"
            href="http://localhost:5173/makeplan"
            size="lg"
          >
            Nuevo Plan de trabajo
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          key="listplan"
          className=" text-center  border-b-1 border-black"
        >
          <Link
            color="foreground"
            href="http://localhost:5173/listplans"
            size="lg"
          >
            Lista de planes de trabajo
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem
          key="login"
          className={
            userInfo.name === false
              ? "text-center  border-b-1 border-black"
              : "hidden"
          }
        >
          <Link href="http://localhost:5173/login" color="primary" size="lg">
            Iniciar sección
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem
          key="register"
          className={userInfo.name === false ? "text-center " : "hidden"}
        >
          <Link color="danger" href="http://localhost:5173/register" size="lg">
            Registrarse
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          key="profile"
          className={
            userInfo.name != false
              ? "text-center  border-b-1 border-black"
              : "hidden"
          }
        >
          <Link color="primary" href="http://localhost:5173/profile" size="lg">
            Mi perfil
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          key="logout"
          className={userInfo.name != false ? "text-center " : "hidden"}
        >
          <Link
            color="danger"
            href="http://localhost:5173/login"
            size="lg"
            onClick={() => {
              updateUserInfo(false, false);
            }}
          >
            Cerrar Sección
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarX;
