export const numberWithSeparator = (
    value: any,
    c = ",",
    showMark: boolean = false
  ): any => {
    if (value === null || value === undefined || value === "-") {
      return "-";
    } else if (
      value === "0" ||
      value === "0.00" ||
      value === 0.0 ||
      value === 0
    ) {
      return 0;
    }
    if (!showMark && +value < 0) {
      value = value.slice(1);
    }
    const result: string =
      "" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, c);
    return showMark ? (+value > 0 ? "+" + result : result) : result;
  };