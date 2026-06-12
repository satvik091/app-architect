import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { friendlyAuthError } from "@/lib/auth-errors";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (password !== confirm) {
      setErrorMsg("The two passwords don't match. Please re-enter them.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setErrorMsg(friendlyAuthError(error.message, "update"));
    } else {
      toast({ title: "Password updated", description: "You are now signed in." });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-foreground">JOBFIT AI</span>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-foreground text-center mb-6">
            Set a new password
          </h2>

          {!ready ? (
            <div className="flex justify-center py-6">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Couldn't update password</AlertTitle>
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
              )}
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-card border-border"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                className="bg-card border-border"
              />
              <Button type="submit" disabled={loading} className="w-full shadow-glow">
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Update password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
