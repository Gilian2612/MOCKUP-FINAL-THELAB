import labLogo from "@/assets/the-lab-logo.svg";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-20">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <img
          src={labLogo}
          alt="The Lab Perfumes"
          className="h-10 w-auto object-contain"
        />
        <p className="label-caps text-muted-foreground">
          Bogotá · Dubai — MMXXVI
        </p>
      </div>
    </footer>
  );
}
