import { groupByDate } from "../../service/dateCounterFactory";
import { groupByDateProvider } from "./GroupByDateProvider";

test("when group by should deliver array", () => {
  expect(groupByDate(groupByDateProvider())).toStrictEqual({
    "2022-06-11": 2,
    "2022-06-13": 3,
    "2022-06-14": 1,
    "2022-06-15": 1,
    "2022-06-16": 2,
    "2022-06-17": 1,
  });
});
