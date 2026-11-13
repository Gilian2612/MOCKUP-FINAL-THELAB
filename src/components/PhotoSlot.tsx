import type { ImgHTMLAttributes } from "react";

/**
 * <img> que, si todavía no hay foto (src vacío), deja el espacio reservado
 * con un aviso "Foto pendiente" en lugar de una imagen rota.
 */
export default function PhotoSlot(props: ImgHTMLAttributes<HTMLImageElement>) {
  if (props.src) return <img {...props} />;
  return (
    <div
      role="img"
      aria-label={props.alt}
      className={`${props.className ?? ""} flex items-center justify-center border border-dashed border-primary-on-photo/40 text-center`}
      style={props.style}
    >
      <span className="label-caps px-2 text-[0.65rem] text-primary-on-photo/70">Foto pendiente</span>
    </div>
  );
}
