import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";

export default function Nav() {
  const [loadingRoute, setLoadingRoute] = useState<string>("");
  const route = useRouter();

  useEffect(() => {
    setLoadingRoute("");
  }, [route.asPath]);

  function handleClick(clickedRoute: string) {
    if (route.asPath !== clickedRoute) {
      setLoadingRoute(clickedRoute);
    }
  }
  return (
    <section className="nav-bar-button">
      <Menu>
        <Link href="/">
          <a onClick={() => handleClick("/")} className="bm-item">
            Program
            {loadingRoute === "/" && <Spinner size="xs" />}
          </a>
        </Link>
        <Link href="/dranks">
          <a onClick={() => handleClick("/dranks")} className="bm-item">
            Drikkeoversikt
            {loadingRoute === "/dranks" && <Spinner size="xs" />}
          </a>
        </Link>
        <Link href="https://qa.favrit.com/en-gb/menu/location/La6Bdajr8nD">
          <a target="_blank" className="bm-item">
            Favrit
          </a>
        </Link>
        <Link href="https://menu.qa.favrit.com/locations/516278/menus/43afad8f-1f56-4e14-8e5b-975cb8edb056">
          <a target="_blank" className="bm-item">
            Favrit Admin
          </a>
        </Link>
        <Link href="/cash">
          <a onClick={() => handleClick("/cash")} className="bm-item">
            Kostnadsoversikt
            {loadingRoute === "/cash" && <Spinner size="xs" />}
          </a>
        </Link>
      </Menu>
    </section>
  );
}
