import {
  Avatar,
  Box,
  ChakraProps,
  Flex,
  Grid,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { url } from "inspector";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { getScore, getUserImages } from "../api";
import Header, { GoogleImageAvatar } from "../components/Header";
import { Score, ScoreTable } from "../models/score";
import { User } from "../models/user";

interface Props {
  scoreTable: ScoreTable;
  user: User;
  userImages: { name: string; url: string }[];
}

export default function ScorePage({ scoreTable, user, userImages }: Props) {
  const sortedPlayers = scoreTable.rows.sort((a, b) => b.score - a.score);
  const topThree = sortedPlayers.slice(0, 3);
  const rest = sortedPlayers.slice(3);

  function getImageForPlayer(player: Score) {
    return userImages.find((row) => row.name === player.name)?.url || "";
  }

  return (
    <main>
      <Header pageTitle="Poeng" user={user} />
      <Flex width="100%" justifyContent="center" marginBottom="40px">
        <Text as="h2" fontSize="xl">
          Poeng opptelt fra {scoreTable.metadata.finished} /{" "}
          {scoreTable.metadata.total} steder
        </Text>
      </Flex>
      <TopPlayer {...topThree[0]} url={getImageForPlayer(topThree[0])} />
      <TwoAndThree
        scores={[topThree[1], topThree[2]]}
        urls={[getImageForPlayer(topThree[1]), getImageForPlayer(topThree[2])]}
      />
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        width="80%"
        margin="10% auto"
      >
        {rest.map((player) => (
          <PlayerRow {...player} url={getImageForPlayer(player)} />
        ))}
      </VStack>
    </main>
  );
}

function TopPlayer(score: Score & { url: string }) {
  return (
    <Flex justifyContent="center" width="100%">
      <Flex direction="column" alignItems="center">
        <GoogleImageAvatar name={score.name} image={score.url} size="2xl" />
        <WinnerBanner
          {...score}
          title="1. Plass"
          backgroundColor="#CFBF66"
          shadowColor="#b59343"
        />
      </Flex>
    </Flex>
  );
}

function WinnerBanner({
  name,
  score,
  title,
  ...props
}: Score & { title: string; backgroundColor?: string; shadowColor?: string }) {
  const { backgroundColor, shadowColor } = props;
  return (
    <Flex position="relative" direction="row" top="-20px">
      <Box
        clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 35% 50%);"
        backgroundColor={backgroundColor}
        height="100%"
        width="50%"
      >
        <Box visibility="hidden" padding="20px">
          <Text textAlign="center">{title}</Text>
          <Text textAlign="center">{name}</Text>
          <Text textAlign="center">{score} poeng</Text>
        </Box>
      </Box>
      <Flex
        direction="column"
        justifyContent="center"
        backgroundColor={backgroundColor}
        padding="20px"
        boxShadow={`10px 0 5px -2px ${shadowColor}, -10px 0 5px -2px ${shadowColor}`}
        position="absolute"
        left="25%"
        zIndex="1"
      >
        <Text textAlign="center" fontWeight="bold">
          {title}
        </Text>
        <Text textAlign="center">{name}</Text>
        <Text textAlign="center">{score} poeng</Text>
      </Flex>
      <Box
        clipPath="polygon(0% 0%, 100% 0%, 65% 50%, 100% 100%, 0% 100%);"
        backgroundColor={backgroundColor}
        height="100%"
        width="50%"
      >
        <Box visibility="hidden" padding="20px">
          <Text textAlign="center">{title}</Text>
          <Text textAlign="center">{name}</Text>
          <Text textAlign="center">{score} poeng</Text>
        </Box>
      </Box>
    </Flex>
  );
}

function TwoAndThree({ scores, urls }: { scores: Score[]; urls: string[] }) {
  const [playerTwo, playerThree] = scores;
  return (
    <>
      <Flex width="100%" justifyContent="start" alignItems="end">
        <Flex alignItems="center" direction="column">
          <GoogleImageAvatar name={playerTwo.name} image={urls[0]} size="xl" />
          <WinnerBanner
            {...playerTwo}
            title="2. Plass"
            backgroundColor="#b4b4b4"
            shadowColor="#888"
          />
        </Flex>
      </Flex>
      <Flex width="100%" justifyContent="end" alignItems="end">
        <Flex alignItems="center" direction="column">
          <GoogleImageAvatar
            name={playerThree.name}
            image={urls[1]}
            size="lg"
          />
          <WinnerBanner
            {...playerThree}
            title="3. Plass"
            backgroundColor="#af9500"
            shadowColor="#623c20"
          ></WinnerBanner>
        </Flex>
      </Flex>
    </>
  );
}

function PlayerRow(score: Score & { url: string }) {
  return (
    <>
      <Grid
        alignItems="center"
        width="80%"
        margin="20px 5px"
        templateColumns="2fr 1fr"
      >
        <Flex alignItems="center" gap="20px">
          <GoogleImageAvatar name={score.name} image={score.url} size="sm" />
          <Text>{score.name}</Text>
        </Flex>
        <Text>{score.score}</Text>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const scoreTable = await getScore();
  const { user } = (await getSession({ req: context.req })) || {};
  context.res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const userImages = await getUserImages();
  return {
    props: {
      scoreTable,
      userImages,
      user: user || null,
    },
  };
}
