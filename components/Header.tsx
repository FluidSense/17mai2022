import { Heading } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import { NorwayFlag } from "./NorwayFlag";

interface Props {
  pageTitle?: string;
}

export default function Header({ pageTitle }: Props) {
  const PageTitle = pageTitle ? (
    <Heading as="h1" size="xl">
      {pageTitle}
    </Heading>
  ) : (
    <Banner />
  );
  return (
    <header className={styles.header}>
      <Nav />
      {PageTitle}
    </header>
  );
}

const Banner = () => (
  <div className={styles.banner}>
    <NorwayFlag className={styles.flag} />
    <Heading as="h1" size="xl" id={styles.mainH1}>
      17. Mai
    </Heading>
    <NorwayFlag className={styles.reversedFlag} />
  </div>
);
