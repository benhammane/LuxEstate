import "server-only";
import bcrypt from "bcryptjs";

export type UserRole = "CLIENT" | "AGENT" | "ADMIN";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  image?: string;
}

/**
 * In-memory user store so authentication works without a database in the demo.
 * Swap `findByEmail`/`createUser` for Prisma queries once `DATABASE_URL` is set.
 * The map lives on `globalThis` to survive dev hot-reloads.
 */
const g = globalThis as unknown as { __luxUsers?: Map<string, StoredUser> };

function seed(): Map<string, StoredUser> {
  const users = new Map<string, StoredUser>();
  const demo: Array<Omit<StoredUser, "passwordHash"> & { password: string }> = [
    {
      id: "demo-client",
      name: "Client Démo",
      email: "demo@luxestate.fr",
      password: "demo1234",
      role: "CLIENT",
    },
    {
      id: "demo-admin",
      name: "Administrateur",
      email: "admin@luxestate.fr",
      password: "admin1234",
      role: "ADMIN",
    },
  ];
  for (const u of demo) {
    users.set(u.email.toLowerCase(), {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      passwordHash: bcrypt.hashSync(u.password, 10),
    });
  }
  return users;
}

function store() {
  if (!g.__luxUsers) g.__luxUsers = seed();
  return g.__luxUsers;
}

export function findByEmail(email: string) {
  return store().get(email.toLowerCase()) ?? null;
}

export async function verifyCredentials(email: string, password: string) {
  const user = findByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const email = input.email.toLowerCase();
  if (store().has(email)) {
    throw new Error("EMAIL_TAKEN");
  }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: input.name,
    email,
    role: "CLIENT",
    passwordHash: await bcrypt.hash(input.password, 10),
  };
  store().set(email, user);
  return user;
}
