import { SECRET_EVENTS } from "./utils";
import { SecretEvent } from "./types";

const activeTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export function triggerRandomEvent(
  onEvent: (event: SecretEvent) => void,
  onEnd: (eventId: string) => void
): SecretEvent | null {
  if (Math.random() > 0.15) return null;

  const eventConfig = SECRET_EVENTS[Math.floor(Math.random() * SECRET_EVENTS.length)];
  const event: SecretEvent = {
    id: eventConfig.id + "-" + Date.now(),
    name: eventConfig.name,
    description: eventConfig.description,
    multiplier: eventConfig.multiplier,
    duration: eventConfig.duration,
    active: true,
    endsAt: Date.now() + eventConfig.duration * 1000,
  };

  onEvent(event);

  activeTimers[event.id] = setTimeout(() => {
    onEnd(event.id);
    delete activeTimers[event.id];
  }, eventConfig.duration * 1000);

  return event;
}

export function clearAllEvents() {
  Object.values(activeTimers).forEach(clearTimeout);
}
