import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const dayjsFormat = (createdAt) => {
  return dayjs(createdAt).format("LL");
};

export const dayjsFormatFromNow = (createdAt) => {
  return dayjs(createdAt).fromNow();
};
