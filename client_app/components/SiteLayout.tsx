import Link from "next/link";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/client'
import md5 from 'md5';
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline'
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon }
]
const secondaryNavigation: any[] = []
const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
]
const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function layout({ children }:any){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [ session, loading ] = useSession()
    const emailHash=function(){
        const email=session?.user?.email ||'' as string;
        return md5(email);
    }
    const userName=function() {
        return session?.user?.name || '' as string;
    }
    const router = useRouter()

    const current=function(item:any) {
        return item.href==router.pathname;
    }

return(

    <div className="h-screen flex overflow-hidden bg-white">
    <Head>
    <link rel="shortcut icon" href="https://wemeasure.org/wp-content/uploads/2020/11/Favicon.png" type="image/x-icon" />
    </Head>
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 lg:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className=" h-32 w-auto"
                src="/images/measure-1-1.png"
                alt="Measure logo"
              />
            </div>
            {
               session && (
                <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        current(item) ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      aria-current={ current(item) ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
               )
            }
            
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>

    {/* Static sidebar for desktop */}
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className=" h-60 w-auto"
              src="/images/measure-1-1.png"
              alt="Measure logo"
            />
          </div>
          { session && (
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    current(item) ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                  )}
                  aria-current={ current(item) ? 'page' : undefined}
                >
                  <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="px-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                  >
                    <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>
          )}
          
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-auto focus:outline-none bg-white">
      <div className="absolute  right-0 float-right  z-10 flex-shrink-0 flex h-12 bg-white border-b border-gray-200 lg:border-none">
        <button
          className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 px-4  flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="ml-4 flex  md:ml-6">

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              {({ open }) => (
                <>
                  <div>
                      { session && (
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={"https://www.gravatar.com/avatar/"+emailHash()}
                        alt="User Photo"
                      />
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>{userName()}
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    )}
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                          onClick={() => {
                              signOut();
                          }}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    <div className="mt-6 sm:mt-0 sm:py-12">{children}</div>
  </div>
  </div>
);
                            }