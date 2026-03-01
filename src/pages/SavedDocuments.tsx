import { useEffect, useState } from "react";
import { FileText, Trash2, Eye, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface SavedDoc {
  id: string;
  title: string | null;
  document_type: string;
  content: string;
  created_at: string;
}

const SavedDocuments = () => {
  const [docs, setDocs] = useState<SavedDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDoc, setViewDoc] = useState<SavedDoc | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDocs = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("saved_documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setDocs(data);
    setLoading(false);
  };

  useEffect(() => { fetchDocs(); }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_documents").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setDocs((prev) => prev.filter((d) => d.id !== id));
      if (viewDoc?.id === id) setViewDoc(null);
    }
  };

  const typeLabels: Record<string, string> = {
    "resume-optimize": "Resume Optimizer",
    "jd-align": "JD Aligner",
    "interview-prep": "Interview Prep",
    "cover-letter": "Cover Letter",
    "linkedin-optimize": "LinkedIn Optimizer",
    "job-planner": "Job Planner",
    "resume-rank": "Resume Ranker",
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Saved Documents</h1>
          <p className="text-muted-foreground">View and manage your previously saved AI outputs.</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : docs.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No saved documents yet. Generate something and click Save!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">{doc.title || "Untitled"}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="bg-secondary px-2 py-0.5 rounded">{typeLabels[doc.document_type] || doc.document_type}</span>
                    <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setViewDoc(doc)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View modal */}
        {viewDoc && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewDoc(null)}>
            <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">{viewDoc.title}</h2>
                <Button variant="ghost" size="sm" onClick={() => setViewDoc(null)}><X className="w-4 h-4" /></Button>
              </div>
              <div className="whitespace-pre-wrap text-sm text-secondary-foreground leading-relaxed">{viewDoc.content}</div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedDocuments;
