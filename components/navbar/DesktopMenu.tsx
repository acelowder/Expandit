"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { MenuButton, CreditsDisplay, PlanDisplay } from "@/components";
import { usePlan } from "@/lib";
import { FaSpinner } from "react-icons/fa";

const DesktopMenu: React.FC = () => {
  const { isSignedIn } = useUser();
  const { loadingPlan } = usePlan();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Editor", href: "/editor" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <div className="hidden md:flex justify-between flex-grow items-center">
      <div className="flex gap-4">
        {menuItems.map((item) => (
          <MenuButton key={item.label} {...item} />
        ))}
      </div>
      {loadingPlan ? (
        <FaSpinner className="animate-spin text-gray-500" />
      ) : isSignedIn ? (
        <div className="flex items-center">
          <PlanDisplay />
          <CreditsDisplay />
          <div className="w-2" />
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "36px", height: "36px" },
                userButtonAvatarImage: { width: "36px", height: "36px" },
              },
            }}
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <MenuButton label="Log In" href="/login" fill rounded />
          <MenuButton label="Sign Up" href="/signup" rounded outline />
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
