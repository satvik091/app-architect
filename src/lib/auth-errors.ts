// Map Supabase auth errors to clear, user-friendly messages.
export function friendlyAuthError(raw: string | undefined, context: "signin" | "signup" | "reset" | "update"): string {
  if (!raw) return "Something went wrong. Please try again.";
  const msg = raw.toLowerCase();

  if (msg.includes("invalid login credentials") || msg.includes("invalid_grant")) {
    return "The email or password you entered is incorrect. Please try again.";
  }
  if (msg.includes("email not confirmed")) {
    return "Please confirm your email address before signing in. Check your inbox for the verification link.";
  }
  if (msg.includes("user already registered") || msg.includes("already been registered") || msg.includes("user_already_exists")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (msg.includes("password should be") || msg.includes("weak password")) {
    return "Password is too weak. Use at least 6 characters with a mix of letters and numbers.";
  }
  if (msg.includes("rate limit") || msg.includes("too many requests") || msg.includes("over_email_send_rate_limit")) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (msg.includes("unable to validate email") || msg.includes("invalid email")) {
    return "That email address doesn't look valid. Please double-check it.";
  }
  if (msg.includes("user not found")) {
    return context === "reset"
      ? "No account found for that email. Please check the address or sign up."
      : "We couldn't find an account with those details.";
  }
  if (msg.includes("network") || msg.includes("failed to fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  if (msg.includes("same password") || msg.includes("new password should be different")) {
    return "Your new password must be different from your current password.";
  }
  if (msg.includes("token") && (msg.includes("expired") || msg.includes("invalid"))) {
    return "This reset link has expired or is invalid. Please request a new one.";
  }

  // Fallback: capitalize but keep the original message visible.
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}
