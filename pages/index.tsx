import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { getPlaces, getTimeline } from "../api-auth";
import {
  getPlaceFromPlaceName,
  Place,
  PlaceDAO,
  placeFromDAO,
} from "../models/place";
import { NorwayFlag } from "../components/NorwayFlag";
import { Timeline, TimelineDAO, timelineFromDAO } from "../models/timeline";
import styles from "../styles/Home.module.css";
import { TimelineIcon } from "../components/TimelineIcon";

interface Props {
  rawTimeline: TimelineDAO[];
  rawPlaces: PlaceDAO[];
}

const Home: NextPage<Props> = ({ rawTimeline, rawPlaces }) => {
  const timeline = rawTimeline.map((row) => timelineFromDAO(row));
  const places = rawPlaces.map((row) => placeFromDAO(row));
  return (
    <div>
      <Head>
        <title>17.05.2022 Veranda til veranda</title>
        <meta name="description" content="Gutta kødder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <nav></nav>
      <main>
        <TimelineView timeline={timeline} places={places} />
      </main>
    </div>
  );
};

const Banner = () => (
  <div className={styles.banner}>
    <NorwayFlag className={styles.flag} />
    <h1 id={styles.mainHeader}>17. Mai</h1>
    <NorwayFlag className={styles.reversedFlag} />
  </div>
);

const TimelineView = ({
  timeline,
  places,
}: {
  timeline: Timeline[];
  places: Place[];
}) => {
  return (
    <table className={styles.timelineTableWrapper}>
      <tbody>
        {timeline.map((entry) => (
          <tr key={entry.placeId + entry.time}>
            <td>
              <TimelineIcon timeline={entry} />
            </td>
            <td className={styles.timeColumn}>
              {entry.time?.toLocaleTimeString("no-NO").substring(0, 5)}
            </td>
            <td>{getPlaceFromPlaceName(places, entry.placeId)?.displayName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const rawTimeline = await getTimeline();
  const rawPlaces = await getPlaces();
  return {
    props: {
      rawTimeline,
      rawPlaces,
    },
  };
}

export default Home;
