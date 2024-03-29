import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { useSelf } from "~/hooks/useSelf";
import placeholderImg from "~/assets/img/placeholder.png";
import { Fragment, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserProfile = () => {
  const { data: sessionData } = useSession();
  const self = useSelf();
  return (
    <Menu as="div" className="relative overflow-visible">
      <Menu.Button className="relative h-14 w-14 cursor-pointer rounded-full border-2 border-black transition hover:shadow-nav">
        <Image
          fill
          className="h-auto w-full rounded-full object-cover"
          alt="User Profile picture"
          src={self.data?.image ?? placeholderImg}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-0"
        enterTo="transform scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-0"
      >
        {sessionData ? (
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y focus:outline-none">
            <div className="flex flex-col gap-1 bg-lime-500 bg-opacity-10 px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => void signOut()}
                    className={`w-full text-center ${
                      active ? "shadow-nav" : "shadow-none"
                    } border-[1px] border-black bg-lime-500 py-1 text-black transition-shadow`}
                  >
                    Kijelentkezés
                  </button>
                )}
              </Menu.Item>
              {self.accountType === "editor" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/author"
                      className={`w-full text-center ${
                        active ? "shadow-nav" : "shadow-none"
                      } border-[1px] border-black bg-lime-500 py-1 text-black transition-shadow`}
                    >
                      Vezérlőpult
                    </Link>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        ) : (
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y focus:outline-none">
            <div className="flex flex-col gap-1 px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => void signIn()}
                    className={`w-full text-center ${
                      active ? "shadow-nav" : "shadow-none"
                    } border-[1px] border-black bg-lime-500 py-1 text-black transition-shadow`}
                  >
                    Bejelentkezés
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
};

export default UserProfile;
