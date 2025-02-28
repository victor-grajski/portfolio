import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
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
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/projects/:projectSlug/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.projectSlug = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.projectSlug as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 