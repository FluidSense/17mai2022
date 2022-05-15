import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";

export default function Nav() {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  function handleClick(clickedRoute: string) {
    if (route.asPath !== clickedRoute) {
      setIsLoading(true);
    }
  }
  return (
    <section className="nav-bar-button">
      <Menu>
        <Link href="/">
          <a onClick={() => handleClick("/")} className="bm-item">
            Program
            {isLoading && route.asPath !== "/" && <Spinner size="xs" />}
          </a>
        </Link>
        <Link href="/dranks">
          <a onClick={() => handleClick("/dranks")} className="bm-item">
            Drikkeoversikt
            {isLoading && route.asPath !== "/dranks" && <Spinner size="xs" />}
          </a>
        </Link>
      </Menu>
    </section>
  );
}
