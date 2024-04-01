import React from "react";

export const processEmptyArray = (array, fnEmpty, fnSuccess) =>
  !array || array.length === 0 ? fnEmpty() : fnSuccess(array);

export const processDefaultEmptyArray = (array, fnSuccess) =>
  processEmptyArray(array, () => <></>, fnSuccess);
