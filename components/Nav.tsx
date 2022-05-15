import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

export default function Nav() {
  return (
    <nav>
      <Menu>
        <Link href="/dranks">
          <a>Drikkeoversikt</a>
        </Link>
      </Menu>
    </nav>
  );
}
