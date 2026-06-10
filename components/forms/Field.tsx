"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import type { FieldDef } from "./configs";
import type { Lang } from "@/lib/i18n";
import type { LeadAttachment } from "@/lib/store";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const inputBase =
  "w-full min-h-12 px-4 py-3 rounded-xl bg-(--surface) border border-(--line) " +
  "text-ivory text-[16px] placeholder:text-text-3 " +
  "transition-all duration-300 ease-(--ease-luxe) " +
  "focus:border-gold/60 focus:bg-(--surface-2) focus:shadow-[0_0_0_3px_rgba(201,168,106,0.15)] focus:outline-none";

export interface FieldProps {
  field: FieldDef;
  lang: Lang;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  files: LeadAttachment[];
  onFiles: (files: LeadAttachment[]) => void;
}

export function Field({ field, lang, value, error, onChange, files, onFiles }: FieldProps) {
  const id = `f-${field.name}`;
  const fileRef = useRef<HTMLInputElement>(null);
  const label = field.label[lang];
  const placeholder = field.placeholder?.[lang];

  const wrap = (control: React.ReactNode) => (
    <div className={cn("flex flex-col gap-1.5", field.half ? "md:col-span-1" : "md:col-span-2")}>
      <label htmlFor={id} className="text-[0.8rem] tracking-[0.06em] text-text-2 font-medium">
        {label}
        {field.required && <span className="text-gold ml-1" aria-hidden>*</span>}
      </label>
      {control}
      <span
        className={cn("text-[0.75rem] min-h-[1.1em] text-[#e89b95]", !error && "invisible")}
        role={error ? "alert" : undefined}
      >
        {error || "·"}
      </span>
    </div>
  );

  switch (field.type) {
    case "textarea":
      return wrap(
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={cn(inputBase, "resize-y min-h-28 leading-relaxed", error && "border-[#e89b95]/60")}
          aria-invalid={!!error}
          aria-required={field.required}
        />
      );

    case "select":
      return wrap(
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            inputBase,
            "appearance-none cursor-pointer pr-10",
            "bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%3E%3Cpath%20fill=%22%23C9A86A%22%20d=%22M6%208L0%200h12z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:10px]",
            !value && "text-text-3",
            error && "border-[#e89b95]/60"
          )}
          aria-invalid={!!error}
          aria-required={field.required}
        >
          <option value="" disabled className="bg-ink-2">
            {lang === "fr" ? "Choisir…" : "Choose…"}
          </option>
          {field.options?.map((o) => (
            <option key={o.en} value={o.en} className="bg-ink-2 text-ivory">
              {o[lang]}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <fieldset className="md:col-span-2 flex flex-col gap-1.5">
          <legend className="text-[0.8rem] tracking-[0.06em] text-text-2 font-medium mb-1.5">
            {label}
            {field.required && <span className="text-gold ml-1" aria-hidden>*</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {field.options?.map((o) => (
              <label
                key={o.en}
                className={cn(
                  "inline-flex items-center min-h-11 px-4 rounded-full border cursor-pointer",
                  "text-[0.85rem] transition-all duration-300 ease-(--ease-luxe) select-none",
                  "[-webkit-tap-highlight-color:transparent] active:scale-[0.97]",
                  value === o.en
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-(--line) text-text-2 hover:border-gold/40"
                )}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={o.en}
                  checked={value === o.en}
                  onChange={() => onChange(o.en)}
                  className="sr-only"
                />
                {o[lang]}
              </label>
            ))}
          </div>
          <span
            className={cn("text-[0.75rem] min-h-[1.1em] text-[#e89b95]", !error && "invisible")}
            role={error ? "alert" : undefined}
          >
            {error || "·"}
          </span>
        </fieldset>
      );

    case "file":
      return (
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <span className="text-[0.8rem] tracking-[0.06em] text-text-2 font-medium">{label}</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            id={id}
            aria-label={label}
            onChange={async (e) => {
              const list = Array.from(e.target.files ?? []).slice(0, 5 - files.length);
              if (list.length) track("upload_start", { field: field.name });
              const read = await Promise.all(
                list.map(
                  (f) =>
                    new Promise<LeadAttachment>((resolve) => {
                      const r = new FileReader();
                      r.onload = () =>
                        resolve({
                          name: f.name,
                          type: f.type,
                          size: f.size,
                          dataUrl: String(r.result),
                        });
                      r.readAsDataURL(f);
                    })
                )
              );
              onFiles([...files, ...read].slice(0, 5));
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="min-h-12 rounded-xl border border-dashed border-(--line-2) bg-(--surface)
              flex items-center justify-center gap-2 text-[0.875rem] text-text-2
              transition-all duration-300 hover:border-gold/60 hover:text-gold active:scale-[0.99]"
          >
            <Camera size={18} strokeWidth={1.6} aria-hidden />
            {lang === "fr" ? "Ajouter des photos" : "Add photos"}
            <span className="text-text-3 text-[0.75rem]">
              ({files.length}/5)
            </span>
          </button>
          {files.length > 0 && (
            <ul className="grid grid-cols-3 xs:grid-cols-4 gap-2 mt-1" aria-label="Uploaded photos">
              {files.map((f, i) => (
                <li key={i} className="relative aspect-square rounded-lg overflow-hidden border border-(--line) group">
                  <Image src={f.dataUrl} alt={f.name} fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    aria-label={`${lang === "fr" ? "Retirer" : "Remove"} ${f.name}`}
                    onClick={() => onFiles(files.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 w-7 h-7 rounded-full bg-ink/80 text-ivory
                      flex items-center justify-center hover:bg-ink active:scale-90 transition-all"
                  >
                    <X size={13} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <span className="text-[0.72rem] text-text-3">
            {lang === "fr" ? "JPG ou PNG, jusqu'à 5 photos" : "JPG or PNG, up to 5 photos"}
          </span>
        </div>
      );

    default:
      return wrap(
        <input
          id={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(inputBase, error && "border-[#e89b95]/60", field.type === "date" && "[color-scheme:dark]")}
          aria-invalid={!!error}
          aria-required={field.required}
          autoComplete={
            field.name === "name"
              ? "name"
              : field.name === "phone"
              ? "tel"
              : field.name === "email"
              ? "email"
              : undefined
          }
        />
      );
  }
}
