import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import DashboardMain from "./DashboardNav";

const page = async () => {
  const sessions = await auth();
  const user = sessions?.user;

  let userName = "";

  if (user) {
    userName = user.name || user.id;
  } else {
    redirect("/signin");
  }

  return (
    <section className="p-3 md:p-6 bg-gray-950 min-h-screen">
      <header className="text-textColor">
        <h1 className="py-3 font-bold text-xl md:text-4xl text-white">
          Dashboard
        </h1>
        <div className="flex justify-between items-end">
          <p className="text-lg text-white md:text-xl">
            <span className="text-xs">
              You are logged in as <br />
            </span>
            {userName}
          </p>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="py-1 md:py-2 px-3 md:px-5 text-xs md:text-sm border rounded-sm border-blue-500 text-white"
            >
              sign out
            </button>
          </form>
        </div>
      </header>
      <DashboardMain />
    </section>
  );
};

export default page;
