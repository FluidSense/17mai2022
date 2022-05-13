import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { places, getTimeline, getPlaces } from "../api";
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
import Link from "next/link";

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
      <header>
        <nav>
          <Link href="/dranks">
            <a>Drikkeoversikt</a>
          </Link>
        </nav>
        <Banner />
      </header>
      <main>
        <Map />
        <h2 style={{ margin: "0 0 0 5%" }}>Program</h2>
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

function Map() {
  return (
    <div style={{ height: "200px", width: "100%" }}>
      <div
        style={{
          backgroundColor: "gray",
          borderRadius: "5%",
          margin: "0 auto",
          height: "80%",
          width: "80%",
        }}
      ></div>
    </div>
  );
}

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
        {timeline.map((entry) => {
          const hasDeparture = !!entry.departure;
          return (
            <>
              <tr key={entry.placeId + entry.arrival}>
                <td>
                  <TimelineIcon timeline={entry} />
                </td>
                <td className={styles.timeColumn}>
                  {entry.arrival?.toLocaleTimeString("no-NO").substring(0, 5)}
                  {hasDeparture && (
                    <>
                      {" "}
                      -{" "}
                      {entry.departure
                        ?.toLocaleTimeString("no-NO")
                        .substring(0, 5)}
                    </>
                  )}
                </td>
                <td>
                  {getPlaceFromPlaceName(places, entry.placeId)?.displayName}
                </td>
              </tr>
            </>
          );
        })}
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
