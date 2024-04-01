import { chooseOnlineClass } from "../../components/compositeCalendar/card/EventDateCard";

test("when choose online class should return right class", () => {
  expect(
    chooseOnlineClass({
      hasWebcast: true,
      onlineOnly: true,
    }),
  ).toBe("card-online");
  expect(
    chooseOnlineClass({
      hasWebcast: true,
      onlineOnly: false,
    }),
  ).toBe("card-online-in-person");
  expect(
    chooseOnlineClass({
      hasWebcast: false,
      onlineOnly: false,
    }),
  ).toBe("card-in-person");
  expect(
    chooseOnlineClass({
      hasWebcast: false,
      onlineOnly: true,
    }),
  ).toBe("card-in-person");
});
