import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getTimeline, getPlaces } from "../api";
import { Place, PlaceDTO, placeFromDTO } from "../models/place";
import { Timeline, TimelineDTO, timelineFromDTO } from "../models/timeline";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import { Heading } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { User } from "../models/user";
import TimelineView from "../components/Timeline";
import { MutableRefObject, useState } from "react";

interface Props {
  rawTimeline: TimelineDTO[];
  rawPlaces: PlaceDTO[];
  user?: User;
}

const InnerMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Home: NextPage<Props> = ({ rawTimeline, rawPlaces, user }) => {
  const timeline = rawTimeline.map((row) => timelineFromDTO(row));
  const places = rawPlaces.map((row) => placeFromDTO(row));
  const [mapMarkerRefs, setMapMarkerRefs] = useState<
    MutableRefObject<L.Popup | null>[]
  >([]);
  const [mapRef, setMapRef] = useState<MutableRefObject<L.Map | null>>();
  return (
    <div>
      <Head>
        <title>17.Mai: Veranda til veranda</title>
        <meta name="description" content="Gutta kødder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={user} />
      <main>
        <Map
          places={places}
          timeline={timeline}
          setPopupRefs={setMapMarkerRefs}
          setMapRef={setMapRef}
        />
        <Heading as="h2" size="xl" style={{ margin: "5% 0 0 5%" }}>
          Program
        </Heading>
        <TimelineView
          completeTimeline={timeline}
          places={places}
          mapMarkerRefs={mapMarkerRefs}
          mapRef={mapRef}
        />
      </main>
    </div>
  );
};

interface MapProps {
  places: Place[];
  timeline: Timeline[];
  setPopupRefs: (refs: MutableRefObject<L.Popup | null>[]) => void;
  setMapRef: (ref: MutableRefObject<L.Map | null>) => void;
}

function Map({ places, timeline, setPopupRefs, setMapRef }: MapProps) {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <InnerMap
        places={places}
        setPopupRefs={setPopupRefs}
        setMapRef={setMapRef}
      />
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
