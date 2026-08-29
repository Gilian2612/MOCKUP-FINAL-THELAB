import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type SpecAccordionItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export function SpecAccordion({ items }: { items: SpecAccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mt-8 flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = item.id === openId;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-3xl border-l-[3px] border-y border-r transition-colors duration-300",
              isOpen
                ? "border-y-transparent border-r-transparent border-l-[#B8935A] bg-[#1A1614]"
                : "border-y-border border-r-border border-l-border bg-transparent",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="label-caps flex w-full items-center justify-between px-6 py-4 text-left tracking-widest text-cream"
            >
              <span>{item.label}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="text-xl leading-none text-primary"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 font-display text-base italic leading-relaxed text-muted-foreground">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
