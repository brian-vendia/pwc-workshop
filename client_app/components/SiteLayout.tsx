import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import md5 from 'md5';

import {
  UserGroupIcon,
  MenuAlt1Icon,
  XIcon,
} from '@heroicons/react/outline'
import {
  ChevronDownIcon
} from '@heroicons/react/solid'

const navigation = [
  { name: 'Heroes', href: '/heroes', icon: UserGroupIcon },
  { name: 'Villians', href: '/villians', icon: UserGroupIcon }

]
const secondaryNavigation: any[] = []

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function layout({ children }:any){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
    const router = useRouter()

    const current=function(item:any) {
        return item.href==router.pathname;
    }

    const emailHash=function(){
      const email=process.env.VENDIA_SHARE_USERNAME ||'' as string;
      return md5(email);
  }

return(

    <div className="h-screen flex overflow-hidden bg-white">
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-300">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2 z-50">
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
            </div>
            {
                <nav className="mt-5 flex-shrink-0 h-full overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        current(item) ? 'bg-gray-500 text-white' : 'text-gray-800 hover:text-white hover:bg-gray-500',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      aria-current={ current(item) ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-gray-600" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
                
              </nav>
               
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
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className=" whitespace-nowrap items-center px-4 bg-gray-600 h-12 mt-0 absolute top-0 w-full z-50">
          <span className="flex items-center mt-1">
          <img className=" h-8" src="/images/square_trans.png" aria-label="logo" alt="logo"/>
          <span className="text-white ml-3 font-bold text-2xl">
            VENDIA
          </span>
          <span className="text-green-400 font-bold text-2xl">
            HEROES
          </span>
            </span>
          </div>
          {
            <nav className=" mt-10 flex-1 flex flex-col overflow-y-auto" aria-label="Sidebar">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    current(item) ? 'bg-gray-500 text-white' : 'text-gray-600 hover:text-white hover:bg-gray-600',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                  )}
                  aria-current={ current(item) ? 'page' : undefined}
                >
                  <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
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
          }
          
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-auto focus:outline-none ">
      <div className="  w-full z-10 flex-shrink-0 flex h-12 bg-gray-600 border-b border-gray-200 lg:border-none">
      <span className="flex items-center mt-1 ml-3">
          <img className=" h-8" src="/images/square_trans.png" aria-label="logo" alt="logo"/>
          <span className="text-white ml-3 font-bold text-2xl">
            VENDIA
          </span>
          <span className=" font-bold text-2xl text-green-400">
            HEROES
          </span>
            </span>
        <button
          className="px-4 pt-1 float-right absolute right-0 border-r border-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    <div className="mt-6 sm:mt-0 sm:py-12 bg-white ml-5 z-0">{children}</div>
  </div>
  </div>
);
                            }