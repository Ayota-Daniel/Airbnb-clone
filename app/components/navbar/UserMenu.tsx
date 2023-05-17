"use client";
import useLoginModal from "@/app/hooks/useLoginModel";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

type Props = {};

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggledOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className={`relative`}>
      <div className={`flex flex-row items-center gap-3`}>
        <div
          onClick={onRent}
          className={`hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
        >
          Airbnb Your home
        </div>
        <div
          onClick={toggledOpen}
          className={`p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition`}
        >
          <AiOutlineMenu />
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      <div>
        {isOpen && (
          <div
            className={`absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm`}
          >
            <div className={`flex flex-col cursor-pointer`}>
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => router.push("/trips")}
                    label={`my trips`}
                  />
                  <MenuItem
                    onClick={() => router.push("/favorites")}
                    label={`my favorites`}
                  />
                  <MenuItem
                    onClick={() => router.push("/reservations")}
                    label={`my reservations`}
                  />
                  <MenuItem
                    onClick={() => router.push("/properties")}
                    label={`my properties`}
                  />
                  <MenuItem onClick={onRent} label={`Airbnb my home`} />
                  <hr />
                  <MenuItem
                    onClick={() => {
                      signOut();
                    }}
                    label={`Logout`}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      toggledOpen();
                      loginModal.onOpen();
                    }}
                    label="Login"
                  />
                  <MenuItem
                    onClick={() => {
                      toggledOpen();
                      registerModal.onOpen();
                    }}
                    label="Sign up"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
