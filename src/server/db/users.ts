import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getUsers = cache(
  (userId?: string) => {
    const user = db.user.findMany({
      where: {
        id: userId ? { not: userId } : undefined,
      },
    });
    return user;
  },
  ["users"],
  { revalidate: 3600 }
);

export const getUser = cache(
  (userId: string) => {
    const user = db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  },
  [`user-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
