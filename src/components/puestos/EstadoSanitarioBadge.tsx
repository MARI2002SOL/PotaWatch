import { ESTADO_SANITARIO_BADGE_CLASSES, ESTADO_SANITARIO_LABELS } from '../../constants';
import type { EstadoSanitario } from '../../types';

interface EstadoSanitarioBadgeProps {
  estado: EstadoSanitario;
}

export function EstadoSanitarioBadge({ estado }: EstadoSanitarioBadgeProps) {
  const label = ESTADO_SANITARIO_LABELS[estado] ?? estado;
  const className =
    ESTADO_SANITARIO_BADGE_CLASSES[estado] ?? 'bg-slate-100 text-slate-700';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
