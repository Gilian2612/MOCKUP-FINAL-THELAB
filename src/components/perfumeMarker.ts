export function createPerfumeMarkerElement(): HTMLElement {
  const box = document.createElement("div");
  box.style.cssText =
    "width:14px;height:14px;border-radius:2px;background:linear-gradient(135deg,#F3E4B0,#B8A76A 55%,#7a6836);transform:rotate(45deg);box-shadow:0 0 0 1px rgba(255,255,255,0.4),0 0 0 5px rgba(184,167,106,0.22),0 0 16px rgba(184,167,106,0.85);";
  return box;
}
