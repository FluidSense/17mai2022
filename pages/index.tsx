import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getTimeline, getPlaces } from "../api";
import { Place, PlaceDAO, placeFromDAO } from "../models/place";
import { Timeline, TimelineDAO, timelineFromDAO } from "../models/timeline";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import { Heading } from "@chakra-ui/react";
import { getProviders, getSession } from "next-auth/react";
import { User } from "../models/user";
import TimelineView from "../components/Timeline";

interface Props {
  rawTimeline: TimelineDAO[];
  rawPlaces: PlaceDAO[];
  user?: User;
}

const InnerMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Home: NextPage<Props> = ({ rawTimeline, rawPlaces, user }) => {
  const timeline = rawTimeline.map((row) => timelineFromDAO(row));
  const places = rawPlaces.map((row) => placeFromDAO(row));
  return (
    <div>
      <Head>
        <title>17.05.2022 Veranda til veranda</title>
        <meta name="description" content="Gutta kødder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={user} />
      <main>
        <Map places={places} timeline={timeline} />
        <Heading as="h2" size="xl" style={{ margin: "5% 0 0 5%" }}>
          Program
        </Heading>
        <TimelineView completeTimeline={timeline} places={places} />
      </main>
    </div>
  );
};

function Map({ places, timeline }: { places: Place[]; timeline: Timeline[] }) {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <InnerMap places={places} />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const rawTimeline = await getTimeline();
  const rawPlaces = await getPlaces();
  const { user } = (await getSession({ req: context.req })) || {};
  context.res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {
      rawTimeline,
      rawPlaces,
      user: user || null,
    },
  };
}

export default Home;
