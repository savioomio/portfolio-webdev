import { useNavigate } from "react-router-dom";
import { FeaturedPicker } from "@/components/dashboard/FeaturedPicker";
import { MessageList } from "@/components/dashboard/MessageList";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Seo } from "@/components/layout/Seo";
import { Button } from "@/components/ui/Button";
import { seoForPrivatePage } from "@/lib/seo";
import { signOut } from "@/services/auth";

function DashboardContent() {
  const navigate = useNavigate();

  const leave = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <main className="mx-auto min-h-svh w-full max-w-wrap px-[var(--gl)] pb-20 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-black leading-tight tracking-[-0.02em]">
          Painel
        </h1>
        <Button variant="outline" size="sm" onClick={leave}>
          Sair
        </Button>
      </div>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section aria-labelledby="painel-mensagens">
          <h2 id="painel-mensagens" className="mb-3 text-2xl font-black">
            Mensagens
          </h2>
          <MessageList />
        </section>
        <section aria-labelledby="painel-destaques">
          <h2 id="painel-destaques" className="mb-3 text-2xl font-black">
            Destaques da Home
          </h2>
          <FeaturedPicker />
        </section>
      </div>
    </main>
  );
}

export default function Dashboard() {
  return (
    <>
      <Seo data={seoForPrivatePage("Painel")} />
      <RequireAuth>
        <DashboardContent />
      </RequireAuth>
    </>
  );
}
