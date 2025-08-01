import NextAuth, {
  NextAuthOptions,
  Session as NextAuthSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { jwtDecode } from 'jwt-decode';

// initialize token interface
interface Token {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
}

// initialize custom session interface by extending NextAuthSession
interface CustomSession extends NextAuthSession {
  accessToken: string;
  refreshToken: string;
}

// write refreshAccessToken function to refresh the access token every 1000 milliseconds

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    // Use absolute URL for server-side fetch
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');
    const data = await response.json();

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: (jwtDecode(data.accessToken as string) as { exp: number }).exp * 1000,
      error: undefined,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'email', placeholder: 'Enter Your Email Address' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const data = { email: credentials?.email, password: credentials?.password };
        // console.log('authorize credentials', credentials);
        const res = await fetch(`https://akil-backend.onrender.com/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const user = await res.json();
        // console.log('response for authorization', user);
        if (res.status === 200 && user) {
          return {
            id: user.data.id,
            accessToken: user.data.accessToken,
            refreshToken: user.data.refreshToken,
            name: user.data.name,
            email: user.data.email,
            role: user.data.role,
            profileComplete: user.data.profileComplete,
            message: user.message,
            success: true,
          };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'default_secret',
  callbacks: {
    // you can callback a function when user is logged in and jwt is created
    async signIn() {
      // console.log('signIn callback', user, account, profile, email, credentials);
      return true;
    },

    async jwt({ token, user, account }) {
      // If user just signed in
      if (user) {
        token.accessToken = user.accessToken || account?.access_token || '';
        token.refreshToken = user.refreshToken || account?.refresh_token || '';
        token.accessTokenExpires = user.accessToken
          ? (jwtDecode(user.accessToken) as { exp: number }).exp * 1000
          : Date.now() + 60 * 60 * 1000; // fallback 1 hour
      }
      // If token is still valid, return it
      if (token.accessToken && Date.now() < (token.accessTokenExpires || 0)) {
        return token;
      }
      // Otherwise, refresh it
      if (token.refreshToken) {
        return refreshAccessToken(token as Token);
      }
      return token;
    },

    async session({ session, token }) {
      // console.log('session callback ', session, token);
      (session as CustomSession).accessToken = token.accessToken;
      (session as CustomSession).refreshToken = token.refreshToken;
      return session;
    },
    // async redirect(params) {
    //   console.log('redirect is ', params);
    //   return params.baseUrl;
    // },
  },
};

export default NextAuth(authOptions);