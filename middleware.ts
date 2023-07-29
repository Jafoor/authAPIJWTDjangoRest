import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export const middleware = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/dashboard")) {
    if (token?.email !== "abujaformdsaleh.2020@gmail.com") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
