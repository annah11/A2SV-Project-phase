// lib/actions/getBookmarksLogic.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import prisma from "@/lib/prismadb";

export async function getBookmarksLogic() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Not authenticated");

  return await prisma.bookmark.findMany({
    where: { user: { email: session.user.email } },
    include: { opportunity: true },
  });
}
