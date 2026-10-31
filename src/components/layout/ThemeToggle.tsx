import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";

/** Os dois ícones vêm no HTML e o CSS mostra um: assim o primeiro render não depende do tema. */
export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Alternar entre tema claro e escuro"
      className="rounded-[9px]"
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </Button>
  );
}
