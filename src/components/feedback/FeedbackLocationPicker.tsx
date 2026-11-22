import { useId } from "react";
import { buildings } from "../../data/buildings";
import CampusPinPicker from "./CampusPinPicker";
import type { FeedbackPin } from "./CampusPinPicker";

export type FeedbackLocation = { buildingId?: string; pin?: FeedbackPin };
const places = [...buildings].sort((a, b) => a.name.localeCompare(b.name));

export default function FeedbackLocationPicker({ location, onChange, labelClassName, fieldClassName }: {
  location: FeedbackLocation;
  onChange: (location: FeedbackLocation) => void;
  labelClassName: string;
  fieldClassName: string;
}) {
  const id = useId();
  const { buildingId, pin } = location;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelClassName}>Location (Optional)</label>
      <select id={id} className={fieldClassName} value={buildingId ?? ""}
        onChange={e => onChange({ buildingId: e.target.value || undefined, pin })}>
        <option value="">Choose a building or landmark</option>
        {places.map(place => <option key={place.id} value={place.id}>{place.name}</option>)}
      </select>
      <details className="space-y-2">
        <summary className="w-fit cursor-pointer rounded text-sm font-medium text-slate-700 underline focus-visible:outline-2 dark:text-on-surface">
          {pin ? "View or change attached pin" : "Drop a pin (optional)"}
        </summary>
        <p className="text-xs text-slate-600 dark:text-on-surface-variant">
          Use a pin if the place isn’t listed or you need to mark an exact spot.
        </p>
        <CampusPinPicker buildingId={buildingId ?? ""} pin={pin ?? null}
          onChange={next => onChange({ buildingId, pin: next ?? undefined })} />
      </details>
    </div>
  );
}
