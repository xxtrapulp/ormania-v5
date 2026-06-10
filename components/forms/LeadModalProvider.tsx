"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { LeadModal } from "./LeadModal";
import type { FormKind } from "./configs";
import type { Lang } from "@/lib/i18n";

interface LeadModalApi {
  open: (kind: FormKind, prefill?: Record<string, string>) => void;
}

const Ctx = createContext<LeadModalApi | null>(null);

export function useLeadModal(): LeadModalApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLeadModal must be used inside LeadModalProvider");
  return ctx;
}

export function LeadModalProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{
    kind: FormKind;
    prefill?: Record<string, string>;
  } | null>(null);

  const open = useCallback((kind: FormKind, prefill?: Record<string, string>) => {
    setState({ kind, prefill });
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {state && (
        <LeadModal
          kind={state.kind}
          prefill={state.prefill}
          lang={lang}
          onClose={() => setState(null)}
        />
      )}
    </Ctx.Provider>
  );
}
