import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="The meetup app created for example"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

//fetch data in this function to get data in first render
//this code running in the server not in client
//Static Site Generation SSG
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://andranikkhachatryandev:hangistnsteq@cluster-test.uriiowo.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((m) => ({
        title: m.title,
        address: m.address,
        image: m.image,
        description: m.description,
        id: m._id.toString(),
      })),
    },
    //UPDATING THE DATA EVERY 10 SECONDS IN SERVER AFTER DEPLOYMENT
    revalidate: 10,
  };
}

//Server Side Rendering SSR
//fetch data from an API
//this code running in the server not in client
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   };
// }

export default HomePage;
