import {
  Avatar,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { User } from "../models/user";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import { NorwayFlag } from "./NorwayFlag";

interface Props {
  pageTitle?: string;
  user?: User;
}

export default function Header({ pageTitle, user }: Props) {
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
      <UserMenu user={user} />
    </header>
  );
}

function Banner() {
  return (
    <div className={styles.banner}>
      <NorwayFlag className={styles.flag} />
      <Heading as="h1" size="xl" id={styles.mainH1}>
        17. Mai
      </Heading>
      <NorwayFlag className={styles.reversedFlag} />
    </div>
  );
}

function UserMenu({ user }: { user?: User }) {
  const [avatarRef, setAvatarRef] = useState<ForwardedRef<HTMLSpanElement>>();
  const avatar = forwardRef<HTMLSpanElement>((props, ref) => {
    useEffect(() => setAvatarRef(ref), [ref]);
    return (
      <Avatar
        ref={ref}
        name={user?.name || ""}
        src={user?.image || ""}
        size="sm"
        {...props}
      />
    );
  });

  useEffect(() => {
    // Hacketyhack to get my image back https://stackoverflow.com/questions/40570117/http403-forbidden-error-when-trying-to-load-img-src-with-google-profile-pic
    if (avatarRef) {
      //@ts-ignore
      avatarRef.current.referrerpolicy = "no-referrer";
    }
  }, [avatarRef]);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Menu>
        <MenuButton as={avatar} />
        <MenuList zIndex={999}>
          {user ? (
            <MenuItem onClick={() => signOut()}>Logg ut</MenuItem>
          ) : (
            <MenuItem onClick={() => signIn("google")}>
              Logg inn med Google
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}
