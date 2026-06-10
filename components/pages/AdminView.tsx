"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check, ChevronRight, Copy, Hammer, Mail, MessageSquarePlus,
  Phone, Search, Trash2, X,
} from "lucide-react";
import {
  addNote, deleteLead, getLeads, getPasscode, LEAD_STATUSES, updateLead,
  type Lead, type LeadStatus, type LeadType,
} from "@/lib/store";
import { type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { luxeEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { IgIcon } from "@/components/ui/icons";

const TYPE_LABELS: Record<LeadType, { en: string; fr: string }> = {
  product: { en: "Product", fr: "Produit" },
  instagram: { en: "Instagram", fr: "Instagram" },
  custom: { en: "Custom", fr: "Sur mesure" },
  repair: { en: "Repair", fr: "Réparation" },
  appointment: { en: "Appointment", fr: "Rendez-vous" },
  contact: { en: "Contact", fr: "Contact" },
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-gold/15 text-gold border-gold/40",
  contacted: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  waiting: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  quote: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  approved: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  progress: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  ready: "bg-teal-500/10 text-teal-300 border-teal-500/30",
  done: "bg-white/8 text-text-2 border-white/15",
  lost: "bg-red-500/10 text-red-300 border-red-500/30",
};

function statusLabel(s: LeadStatus, lang: Lang) {
  const st = LEAD_STATUSES.find((x) => x.id === s);
  return lang === "fr" ? st?.labelFr ?? s : st?.label ?? s;
}

function StatusPill({ status, lang }: { status: LeadStatus; lang: Lang }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[0.68rem] tracking-[0.06em] uppercase px-2 py-0.5 rounded-full border whitespace-nowrap",
        STATUS_COLORS[status]
      )}
    >
      {statusLabel(status, lang)}
    </span>
  );
}

/* ── Login screen ── */
function Login({ onAuth, lang }: { onAuth: () => void; lang: Lang }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-24">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pass === getPasscode()) {
            sessionStorage.setItem("ormania.admin.auth", "1");
            onAuth();
          } else setErr(true);
        }}
        className="surface-card w-full max-w-sm p-7 md:p-9 text-center"
      >
        <Image
          src="/brand/ormania.svg"
          alt="Ormania"
          width={174}
          height={40}
          className="h-9 w-auto mx-auto mb-6"
        />
        <h1 className="font-serif text-[1.4rem] text-ivory mb-1">
          {lang === "fr" ? "Espace personnel" : "Staff area"}
        </h1>
        <p className="text-[0.8rem] text-text-3 mb-6">
          {lang === "fr" ? "Démo — code d'accès : 1234" : "Demo — passcode: 1234"}
        </p>
        <label className="block">
          <span className="sr-only">{lang === "fr" ? "Code d'accès" : "Passcode"}</span>
          <input
            type="password"
            inputMode="numeric"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setErr(false);
            }}
            placeholder="••••"
            className={cn(
              "w-full min-h-12 px-4 text-center tracking-[0.5em] rounded-xl bg-(--surface) border text-ivory text-[18px]",
              "transition-all duration-300 focus:outline-none focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(201,168,106,0.15)]",
              err ? "border-[#e89b95]" : "border-(--line)"
            )}
            aria-invalid={err}
          />
        </label>
        {err && (
          <p className="text-[0.78rem] text-[#e89b95] mt-2" role="alert">
            {lang === "fr" ? "Code invalide" : "Invalid passcode"}
          </p>
        )}
        <button
          type="submit"
          className="btn-sheen w-full min-h-12 mt-5 rounded-full bg-gold text-ink text-[0.9rem] font-medium
            transition-all duration-300 hover:bg-gold-3 active:scale-[0.98]"
        >
          {lang === "fr" ? "Entrer" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* ── Lead detail drawer ── */
function LeadDrawer({
  lead,
  lang,
  onClose,
  onChange,
}: {
  lead: Lead;
  lang: Lang;
  onClose: () => void;
  onChange: () => void;
}) {
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const fr = lang === "fr";

  const setStatus = (s: LeadStatus) => {
    updateLead(lead.id, { status: s });
    track("admin_status_change", { id: lead.id, status: s });
    onChange();
  };

  const quick: { label: string; status: LeadStatus }[] = [
    { label: fr ? "Contacté" : "Contacted", status: "contacted" },
    { label: fr ? "Devis envoyé" : "Quote sent", status: "quote" },
    { label: fr ? "Approuvé" : "Approved", status: "approved" },
    { label: fr ? "Terminé" : "Completed", status: "done" },
  ];

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[140] bg-ink/70 backdrop-blur-sm"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        initial={reduce ? false : { x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: luxeEase }}
        className="fixed right-0 top-0 bottom-0 z-[150] w-full max-w-md bg-ink-2 border-l border-(--line)
          shadow-[-24px_0_80px_rgba(0,0,0,0.5)] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={lead.id}
      >
        <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-(--line)">
          <div>
            <p className="font-mono text-[0.78rem] text-gold tracking-[0.08em]">{lead.id}</p>
            <h2 className="font-serif text-[1.4rem] text-ivory leading-tight">{lead.name || "—"}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <StatusPill status={lead.status} lang={lang} />
              <span className="text-[0.72rem] text-text-3">
                {TYPE_LABELS[lead.type][lang]} · {new Date(lead.createdAt).toLocaleDateString(fr ? "fr-CA" : "en-CA")}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={fr ? "Fermer" : "Close"}
            className="min-h-11 min-w-11 inline-flex items-center justify-center text-text-2 hover:text-ivory"
          >
            <X size={19} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
          {/* Quick actions */}
          <div>
            <p className="eyebrow mb-2.5">{fr ? "Actions rapides" : "Quick actions"}</p>
            <div className="flex flex-wrap gap-2">
              {quick.map((q) => (
                <button
                  key={q.status}
                  onClick={() => setStatus(q.status)}
                  className={cn(
                    "min-h-10 px-3.5 rounded-full border text-[0.78rem] transition-all duration-300 active:scale-[0.96]",
                    lead.status === q.status
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-(--line) text-text-2 hover:border-gold/40 hover:text-ivory"
                  )}
                >
                  {lead.status === q.status && <Check size={11} className="inline mr-1 -mt-px" aria-hidden />}
                  {q.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {lead.phone && (
                <a
                  href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                  className="min-h-10 px-3.5 rounded-full border border-(--line) text-[0.78rem] text-text-2
                    inline-flex items-center gap-1.5 hover:border-gold/40 hover:text-ivory transition-all"
                >
                  <Phone size={12} aria-hidden /> {fr ? "Appeler" : "Call"}
                </a>
              )}
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="min-h-10 px-3.5 rounded-full border border-(--line) text-[0.78rem] text-text-2
                    inline-flex items-center gap-1.5 hover:border-gold/40 hover:text-ivory transition-all"
                >
                  <Mail size={12} aria-hidden /> {fr ? "Courriel" : "Email"}
                </a>
              )}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `${lead.name} — ${lead.phone ?? ""} — ${lead.email ?? ""} — ${lead.id}`
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                }}
                className="min-h-10 px-3.5 rounded-full border border-(--line) text-[0.78rem] text-text-2
                  inline-flex items-center gap-1.5 hover:border-gold/40 hover:text-ivory transition-all"
              >
                <Copy size={12} aria-hidden /> {copied ? (fr ? "Copié !" : "Copied!") : fr ? "Copier infos" : "Copy info"}
              </button>
            </div>
          </div>

          {/* Full status pipeline */}
          <div>
            <p className="eyebrow mb-2.5">{fr ? "Statut" : "Status"}</p>
            <div className="flex flex-wrap gap-1.5">
              {LEAD_STATUSES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatus(s.id)}
                  className={cn(
                    "min-h-9 px-3 rounded-full border text-[0.72rem] transition-all duration-300 active:scale-[0.96]",
                    lead.status === s.id ? STATUS_COLORS[s.id] : "border-white/10 text-text-3 hover:text-text-2"
                  )}
                >
                  {fr ? s.labelFr : s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customer info */}
          <div>
            <p className="eyebrow mb-2.5">{fr ? "Client" : "Customer"}</p>
            <dl className="surface-card p-4 text-[0.85rem] flex flex-col gap-1.5">
              {lead.phone && <div className="flex justify-between gap-3"><dt className="text-text-3">{fr ? "Téléphone" : "Phone"}</dt><dd className="text-ivory">{lead.phone}</dd></div>}
              {lead.email && <div className="flex justify-between gap-3"><dt className="text-text-3">{fr ? "Courriel" : "Email"}</dt><dd className="text-ivory break-all">{lead.email}</dd></div>}
              {lead.instagram && <div className="flex justify-between gap-3"><dt className="text-text-3">Instagram</dt><dd className="text-ivory">{lead.instagram}</dd></div>}
              {lead.preferredContact && <div className="flex justify-between gap-3"><dt className="text-text-3">{fr ? "Contact préféré" : "Prefers"}</dt><dd className="text-ivory">{lead.preferredContact}</dd></div>}
            </dl>
          </div>

          {/* Request details */}
          {(lead.message || Object.keys(lead.extras).length > 0) && (
            <div>
              <p className="eyebrow mb-2.5">{fr ? "Demande" : "Request"}</p>
              <div className="surface-card p-4 text-[0.85rem] flex flex-col gap-2">
                {Object.entries(lead.extras)
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <span className="text-text-3 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                      <span className="text-ivory text-right break-all">{v}</span>
                    </div>
                  ))}
                {lead.message && (
                  <p className="text-text-2 leading-relaxed border-t border-white/5 pt-2 mt-1">
                    {lead.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Attachments */}
          {lead.attachments.length > 0 && (
            <div>
              <p className="eyebrow mb-2.5">
                {fr ? "Images téléversées" : "Uploaded images"} ({lead.attachments.length})
              </p>
              <div className="grid grid-cols-4 gap-2">
                {lead.attachments.map((a, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-(--line)">
                    <Image src={a.dataUrl} alt={a.name} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <p className="eyebrow mb-2.5">{fr ? "Notes internes" : "Internal notes"}</p>
            <div className="flex flex-col gap-2 mb-3">
              {lead.notes.length === 0 && (
                <p className="text-[0.8rem] text-text-3 italic">{fr ? "Aucune note." : "No notes yet."}</p>
              )}
              {lead.notes.map((n, i) => (
                <div key={i} className="surface-card p-3 text-[0.82rem]">
                  <p className="text-text-2 leading-relaxed">{n.text}</p>
                  <p className="text-[0.68rem] text-text-3 mt-1">
                    {new Date(n.at).toLocaleString(fr ? "fr-CA" : "en-CA")}
                  </p>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!note.trim()) return;
                addNote(lead.id, note.trim());
                track("admin_note_added", { id: lead.id });
                setNote("");
                onChange();
              }}
            >
              <label className="flex-1">
                <span className="sr-only">{fr ? "Ajouter une note" : "Add a note"}</span>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={fr ? "Ajouter une note…" : "Add a note…"}
                  className="w-full min-h-11 px-3.5 rounded-xl bg-(--surface) border border-(--line) text-ivory text-[16px]
                    placeholder:text-text-3 focus:outline-none focus:border-gold/60 transition-all"
                />
              </label>
              <button
                type="submit"
                aria-label={fr ? "Ajouter la note" : "Add note"}
                className="min-h-11 min-w-11 rounded-xl bg-gold text-ink flex items-center justify-center
                  hover:bg-gold-3 active:scale-[0.95] transition-all"
              >
                <MessageSquarePlus size={17} aria-hidden />
              </button>
            </form>
          </div>

          <button
            onClick={() => {
              if (confirm(fr ? "Supprimer ce lead ?" : "Delete this lead?")) {
                deleteLead(lead.id);
                onChange();
                onClose();
              }
            }}
            className="self-start inline-flex items-center gap-1.5 min-h-10 text-[0.78rem] text-red-300/70 hover:text-red-300 transition-colors"
          >
            <Trash2 size={13} aria-hidden /> {fr ? "Supprimer" : "Delete lead"}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

/* ── Main admin view ── */
export function AdminView({ lang }: { lang: Lang }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [typeFilter, setTypeFilter] = useState<LeadType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const fr = lang === "fr";

  const refresh = () => setLeads(getLeads());

  useEffect(() => {
    // One-time client init: sessionStorage/localStorage don't exist during SSG,
    // so auth + leads must be hydrated after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthed(sessionStorage.getItem("ormania.admin.auth") === "1");
    setReady(true);
    refresh();
  }, []);

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        if (typeFilter !== "all" && l.type !== typeFilter) return false;
        if (statusFilter !== "all" && l.status !== statusFilter) return false;
        if (q) {
          const hay = `${l.id} ${l.name} ${l.email ?? ""} ${l.phone ?? ""} ${l.message ?? ""}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      }),
    [leads, typeFilter, statusFilter, q]
  );

  const selectedLead = leads.find((l) => l.id === selected);

  if (!ready) return <div className="min-h-[70vh]" />;
  if (!authed) return <Login lang={lang} onAuth={() => { setAuthed(true); refresh(); }} />;

  const kpis: { label: string; value: number; icon: React.ReactNode }[] = [
    {
      label: fr ? "Nouveaux leads" : "New leads",
      value: leads.filter((l) => l.status === "new").length,
      icon: <ChevronRight size={16} aria-hidden />,
    },
    {
      label: fr ? "En cours" : "In progress",
      value: leads.filter((l) => ["contacted", "waiting", "quote", "approved", "progress"].includes(l.status)).length,
      icon: <Hammer size={16} aria-hidden />,
    },
    {
      label: fr ? "Prêts / terminés" : "Ready / done",
      value: leads.filter((l) => ["ready", "done"].includes(l.status)).length,
      icon: <Check size={16} aria-hidden />,
    },
    {
      label: fr ? "Demandes Instagram" : "Instagram inquiries",
      value: leads.filter((l) => l.type === "instagram").length,
      icon: <IgIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex items-end justify-between gap-3 mb-7">
          <div>
            <span className="eyebrow block mb-2">{fr ? "Espace personnel" : "Staff dashboard"}</span>
            <h1 className="font-serif text-[clamp(1.7rem,5vw,2.5rem)] text-ivory leading-tight">
              {fr ? "Leads et demandes" : "Leads & requests"}
            </h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("ormania.admin.auth");
              setAuthed(false);
            }}
            className="min-h-11 px-4 rounded-full border border-(--line) text-[0.8rem] text-text-2
              hover:border-gold/40 hover:text-ivory transition-all shrink-0"
          >
            {fr ? "Quitter" : "Sign out"}
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-7">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: luxeEase }}
              className="surface-card p-4 md:p-5"
            >
              <span className="text-gold">{k.icon}</span>
              <p className="font-serif text-[2rem] text-ivory leading-none mt-2">{k.value}</p>
              <p className="text-[0.75rem] text-text-3 mt-1">{k.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <label className="relative md:max-w-60 w-full">
            <span className="sr-only">{fr ? "Rechercher" : "Search"}</span>
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={fr ? "Rechercher…" : "Search…"}
              className="w-full min-h-11 pl-9 pr-3.5 rounded-full bg-(--surface) border border-(--line) text-ivory text-[16px]
                placeholder:text-text-3 focus:outline-none focus:border-gold/60 transition-all"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["all", ...Object.keys(TYPE_LABELS)] as (LeadType | "all")[]).map((tp) => (
              <button
                key={tp}
                onClick={() => setTypeFilter(tp)}
                className={cn(
                  "shrink-0 min-h-11 px-3.5 rounded-full border text-[0.78rem] whitespace-nowrap transition-all active:scale-[0.96]",
                  typeFilter === tp
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-(--line) text-text-2 hover:border-gold/40"
                )}
              >
                {tp === "all" ? (fr ? "Tous" : "All") : TYPE_LABELS[tp][lang]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(["all", ...LEAD_STATUSES.map((s) => s.id)] as (LeadStatus | "all")[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "shrink-0 min-h-9 px-3 rounded-full border text-[0.7rem] whitespace-nowrap transition-all active:scale-[0.96]",
                statusFilter === s
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-white/10 text-text-3 hover:text-text-2"
              )}
            >
              {s === "all" ? (fr ? "Tous statuts" : "All statuses") : statusLabel(s, lang)}
            </button>
          ))}
        </div>

        {/* Lead list */}
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {filtered.map((l, i) => (
              <motion.button
                key={l.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: luxeEase, delay: Math.min(i * 0.03, 0.3) }}
                onClick={() => setSelected(l.id)}
                className="surface-card card-glow w-full text-left p-4 flex items-center gap-3 md:gap-4
                  [-webkit-tap-highlight-color:transparent]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-ivory text-[0.95rem]">{l.name || "—"}</span>
                    <StatusPill status={l.status} lang={lang} />
                    <span className="text-[0.7rem] text-text-3 uppercase tracking-[0.08em]">
                      {TYPE_LABELS[l.type][lang]}
                    </span>
                  </div>
                  <p className="text-[0.8rem] text-text-3 truncate mt-0.5">
                    {l.message || Object.values(l.extras).filter(Boolean).join(" · ") || l.id}
                  </p>
                </div>
                <div className="text-right shrink-0 hidden xs:block">
                  <p className="font-mono text-[0.68rem] text-gold/80">{l.id}</p>
                  <p className="text-[0.7rem] text-text-3">
                    {new Date(l.createdAt).toLocaleDateString(fr ? "fr-CA" : "en-CA")}
                  </p>
                </div>
                <ChevronRight size={16} className="text-text-3 shrink-0" aria-hidden />
              </motion.button>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-text-3 py-14 text-[0.9rem]">
              {fr ? "Aucun lead trouvé." : "No leads found."}
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedLead && (
          <LeadDrawer
            lead={selectedLead}
            lang={lang}
            onClose={() => setSelected(null)}
            onChange={refresh}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
