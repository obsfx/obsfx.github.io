import { Experience } from "@/src/lib/experience";

export abstract class ExperienceClock {
  private static readonly intervalMs = 60_000;

  static start(): () => void {
    const render = () => {
      const experience = Experience.format(new Date());
      document.querySelectorAll<HTMLElement>("[data-experience]").forEach((element) => {
        element.textContent = experience;
      });
    };
    render();
    const timer = window.setInterval(render, ExperienceClock.intervalMs);
    return () => {
      window.clearInterval(timer);
    };
  }
}
