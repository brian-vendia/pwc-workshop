import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/client";
import Card from "../components/Card";
import CIMCard from "../components/CIMCard";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Protected() {
  return (
    <div>
      <Head>
        <title>Authentication with NextAuth and AWS Cognito</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <section className=" w-full space-y-8  flex items-center flex-col">
            <h1 className="my-6 text-center text-3xl font-extrabold text-gray-900">
              CIM Dashboard
            </h1>
            <div className=" w-full inline-block mx-auto text-center">
              <div className=" w-1/4 inline-block">
                <Card className="h-60 bg-gradient-to-r from-green-600 to-green-400 " title="Activity Metrics">
                  <span className="text-bold text-white text-8xl">10</span>
             
                  </Card>
              </div>
              <div className=" w-1/4 inline-block">
                <Card className="h-60 bg-gradient-to-r from-blue-600 to-blue-400 " title="Short Term Goals Completed">
                  <span className="text-bold text-white text-8xl">1/8</span>
                  </Card>
              </div>
              <div className=" w-1/4 inline-block">
                <Card className="h-60 bg-gradient-to-r from-red-600 to-red-400 " title="Activities Completed">
                  <span className="text-bold text-white text-8xl">1/6</span>
                  </Card>
              </div>
            </div>
          </section>
          </div> <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <section className=" w-full space-y-8  flex items-center flex-col">
          <h1 className="my-6 text-center text-3xl font-extrabold text-gray-900">
              Vendia's Community Impact Metrics
            </h1>
            <CIMCard className=" w-5/6 bg-white" title="Family Support">
              <div className=" h-32">
                <h1>Family Support</h1>
                Some details about the specific metric and a link to it's definition would be here
              </div>
              
              </CIMCard>
              <CIMCard className=" w-5/6 bg-white" title="Family Support">
              <div className=" h-32">
                <h1>Family Support</h1>
                Some details about the specific metric and a link to it's definition would be here
              </div>
              
              </CIMCard>
              <CIMCard className=" w-5/6 bg-white" title="Family Support">
              <div className=" h-32">
                <h1>Family Support</h1>
                Some details about the specific metric and a link to it's definition would be here
              </div>
              
              </CIMCard>
              <CIMCard className=" w-5/6 bg-white" title="Family Support">
              <div className=" h-32">
                <h1>Family Support</h1>
                Some details about the specific metric and a link to it's definition would be here
              </div>
              
              </CIMCard>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Protected;

export async function getServerSideProps(context: any) {
  const { res } = context;
  const session = await getSession(context);

  if (!session) {
    res.writeHead(302, {
      Location: "/",
    });
    return res.end();
  }

  return {
    props: { session },
  };
}
