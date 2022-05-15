import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

export default function Nav() {
  return (
    <section className="nav-bar-button">
      <Menu>
        <Link href="/">
          <a className="bm-item">Program</a>
        </Link>
        <Link href="/dranks">
          <a className="bm-item">Drikkeoversikt</a>
        </Link>
      </Menu>
    </section>
  );
}
