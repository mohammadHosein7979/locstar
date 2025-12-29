"use client";

import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import Link from "next/link";

const AvatarOrSignin = () => {
  const { status } = useSession();

  return status == "authenticated" ? (
    <Avatar />
  ) : (
    <Link href="/auth/signin?type=otp">ورود</Link>
  );
};

export default AvatarOrSignin;
