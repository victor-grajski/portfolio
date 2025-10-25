import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Project Password',
      credentials: {
        password: { label: 'Password', type: 'password' },
        projectSlug: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.projectSlug) {
          return null;
        }

        const correctPassword = process.env.PROJECT_PASSWORD;

        if (correctPassword && credentials.password === correctPassword) {
          return {
            id: credentials.projectSlug,
            name: 'Authenticated Viewer',
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/projects/:projectSlug/auth',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.projectSlug = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.projectSlug as string;
      }
      return session;
    },
  },
};
