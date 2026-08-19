/**
 * Browser client — NO direct DB access.
 * All data operations go through server actions.
 * Auth goes through API routes.
 */

export function createClient() {
  return {
    auth: {
      signInWithOtp: async (_opts: any) => {
        return { error: new Error("OTP not supported, use password login") };
      },
      verifyOtp: async (_opts: any) => {
        return { error: new Error("OTP not supported, use password login") };
      },
      signInWithPassword: async (opts: any) => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(opts),
        });
        const data = await res.json();
        return { error: data.error ? new Error(data.error) : null };
      },
      signOut: async () => {
        await fetch("/api/auth/logout", { method: "POST" });
      },
      getUser: async () => {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        return { data: { user: data.user }, error: null };
      },
    },
  };
}
