import Head from "next/head";
import Link from "next/link";
import * as auth from "next-auth/client";
import SiteLayout from "../components/SiteLayout";
import Router from 'next/router';

export default function Home() {
  const [session, loading] = auth.useSession();
  return (
    <div>
      <Head>
        <title>Measure CIM Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 flex items-center flex-col">
            {!session && (
              <>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign In to Continue
                </h2>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-1/2 mt-12 rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                  onClick={() => {
                    auth.signIn("cognito", {
                      callbackUrl: `${window.location.origin}/dashboard`,
                    });
                  }}
                >
                  Sign In
                </button>
              </>
            )}

            {session && (
              <>
                <h1 className="my-6 text-center text-3xl font-extrabold text-gray-900">
                  Welcome, {session?.user?.name ?? session?.user?.name}
                </h1>
                <nav>
                      Select a page from the left menu to continue
                 
                </nav>
             
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
