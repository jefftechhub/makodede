import { NextResponse } from "next/server";
import { Session } from "../mongooseSchema";
import { cookies } from "next/headers";

export function middleware(req) {
  const cookie = req.cookies.get("session");

  console.log(cookie.value);

  // const userId = cookies.session;
}

//See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard",
};
