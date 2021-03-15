interface ILimitPage {
  _limit: number;
  _page: number;
}
export default (limit: number = 10, page: number = 1): ILimitPage => ({
  _limit: Math.min(limit, 100),
  _page: Math.max(0, page),
});
