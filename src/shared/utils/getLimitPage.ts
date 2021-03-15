interface ILimitPage {
  _limit: number;
  _page: number;
}
export default (limit = 10, page = 1): ILimitPage => ({
  _limit: Math.min(limit, 100),
  _page: Math.max(0, page),
});
