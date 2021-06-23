import Head from "next/head";
import Link from "next/link";
import * as auth from "next-auth/client";
import SiteLayout from "../components/SiteLayout";
import Router from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import md5 from "md5";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";

/*
const userProfile = gql`
Query {
    __schema {

    }
}`;
*/
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  //const { loading, error, data } = useQuery(userProfile);
  const loading=false;
  const error=false;
  const data = {
    uuid: "123",
    firstName: "Cory",
    lastName: "Forsythe",
    company: "Vendia",
    title: "Solutions Architect",
    phone: "859-533-3563",
    avatar: "",
    email: "cory@vendia.net",
    organization: "Vendia",
    receiveMatches: true,
  };
  const [session] = auth.useSession();
  const [receiveMatches, setreceiveMatches] = useState(true)

  const emailHash = function () {
    const email = session?.user?.email || ("" as string);
    return md5(email);
  };
  return (
    <div>
      <Head>
        <title>User Profile - CIM Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full space-y-8 flex items-center flex-col">
            {!loading && error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {!loading && data && (
              <div>
                <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                      <form
                        className="divide-y divide-gray-200 lg:col-span-9"
                        action="#"
                        method="POST"
                      >
                        {/* Profile section */}
                        <div className="py-6 px-4 sm:p-6 lg:pb-8">
                          <div>
                            <h2 className="text-lg leading-6 font-medium text-gray-900">
                              Profile
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              This information will be displayed publicly so be
                              careful what you share.
                            </p>
                          </div>

                          <div className="mt-6 flex flex-col lg:flex-row">
                            <div className="flex-grow space-y-6">
                              <div>
                                <label
                                  htmlFor="username"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Username
                                </label>
                                <div className="mt-1 rounded-md shadow-sm flex">
                                  <input
                                    type="text"
                                    readOnly={true}
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    defaultValue={session?.user?.email || ""}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                              <p
                                className="text-sm font-medium text-gray-700"
                                aria-hidden="true"
                              >
                                Photo
                              </p>
                              <div className="mt-1 lg:hidden">
                                <div className="flex items-center">
                                  <div
                                    className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                    aria-hidden="true"
                                  >
                                    <img
                                      className="rounded-full h-full w-full"
                                      src={
                                        "https://www.gravatar.com/avatar/" +
                                        emailHash()
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-5 rounded-md shadow-sm">
                                    <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="hidden relative rounded-full overflow-hidden lg:block">
                                <img
                                  className="relative rounded-full w-40 h-40"
                                  src={
                                    "https://www.gravatar.com/avatar/" +
                                    emailHash()
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-6">
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                First name
                              </label>
                              <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                defaultValue={data.firstName}
                                autoComplete="given-name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                              />
                            </div>

                            <div className="col-span-12 sm:col-span-6">
                              <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                defaultValue={data.lastName}
                                autoComplete="family-name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                              />
                            </div>

                            <div className="col-span-12 sm:col-span-6">
                              <label
                                htmlFor="company"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                name="company"
                                id="company"
                                defaultValue={data.organization}
                                autoComplete="organization"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Privacy section */}
                        <div className="pt-6 divide-y divide-gray-200">
                          <div className="px-4 sm:px-6">
                            <div>
                              <h2 className="text-lg leading-6 font-medium text-gray-900">
                                Notifications
                              </h2>
                              <p className="mt-1 text-sm text-gray-500">
                                
                              </p>
                            </div>
                            <ul className="mt-2 divide-y divide-gray-200">
                              <Switch.Group
                                as="li"
                                className="py-4 flex items-center justify-between"
                              >
                                <div className="flex flex-col">
                          <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                            Receive Matches
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            You will be notified when other nearby organizations match your Community Impact Metrics (CIMs).
                          </Switch.Description>
                          </div>
                        <Switch
                          checked={receiveMatches}
                          onChange={setreceiveMatches}
                          className={classNames(
                            receiveMatches ? ' bg-green-700' : 'bg-gray-400',
                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500'
                          )}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                                receiveMatches ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                              </Switch.Group>
                             
                            </ul>
                          </div>
                          <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                            <button
                              type="button"
                              onClick={()=>{
                                Router.back();
                            }}
                              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              onClick={()=>{
                                  Router.back();
                              }}
                              className="ml-5 bg-green-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
