import { Moon, Sun, Clapperboard } from "lucide-react";

export default function ThemeToggle({ theme, nextTheme }) {
  const config = {
    dark: {
      label: "Dark",
      icon: Moon,
    },
    light: {
      label: "Light",
      icon: Sun,
    },
    brand: {
      label: "Capsula",
      icon: Clapperboard,
    },
  };

  const { label, icon: Icon } = config[theme];

  return (
    <button
      onClick={nextTheme}
      title={`Tema actual: ${label}`}
      className="
        flex items-center gap-2
        px-3 py-2
        rounded-lg
        bg-surface
        border border-border
        text-foreground
        hover:bg-surface-hover
        transition-all
        cursor-pointer
      "
    >
      <Icon className="w-4 h-4" />

      <span className="hidden lg:block text-xs font-semibold">
        {label}
      </span>
    </button>
  );
}