import { redirect } from "next/navigation";
import Signin from "./Signin";
import { auth, signIn } from "@/auth";
import Image from "next/image";

export const metadata = {
  title: "Sign In",
  description:
    "Welcome back! Sign in to access your personalized dashboard where you can manage your account settings, track your progress, and explore exclusive features.",
};

const page = async () => {
  const sessions = await auth();
  const user = sessions?.user;

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-white md:bg-gray-950 min-h-screen flex justify-center items-center md:px-10">
      <main className="bg-white rounded-md w-full md:px-0 md:w-2/3 lg:w-1/2 px-8 py-10">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-3xl py-5 font-bold">Welcome Back!</h1>
          <form
            action={async () => {
              "use server";
              await signIn("google");
              redirect("/dashboard");
            }}
            className="w-full"
          >
            <button
              className="border rounded-md w-full px-5 py-1.5 justify-center border-gray-500 flex gap-1 items-center text-sm"
              type="submit"
            >
              <Image
                src="/Logo/google.png"
                width={200}
                height={200}
                className="h-6 w-6 md:h-8 md:w-8"
              />
              Signin with Google
            </button>
          </form>
          <div className="relative border-b-2 border-gray-400 w-full my-10">
            <p className="text-sm px-6  absolute  -translate-y-1/2  bg-white left-1/2 -translate-x-1/2">
              or
            </p>
          </div>
        </div>
        <Signin />
      </main>
    </section>
  );
};

export default page;
