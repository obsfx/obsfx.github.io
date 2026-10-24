import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import plur from "plur";

dayjs.extend(utc);

export abstract class Experience {
  private static readonly careerStart = dayjs.utc("2021-02-01");
  private static readonly units = ["year", "month", "day", "hour"] as const;

  static readonly careerStartLabel = Experience.careerStart.format("MMMM YYYY");

  static format(now: Date): string {
    const moment = dayjs.utc(now);
    const parts: string[] = [];
    let cursor = Experience.careerStart;
    for (const unit of Experience.units) {
      const value = moment.diff(cursor, unit);
      cursor = cursor.add(value, unit);
      if (value > 0) {
        parts.push(`${value} ${plur(unit, value)}`);
      }
    }
    return parts.join(" ");
  }
}
