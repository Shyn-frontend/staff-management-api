interface IMetadata {
  page: number;
  pageSize: number;
  totalPages: number;
}

export default (
  page: number,
  limit: number,
  totalRecords: number,
): IMetadata => ({
  page,
  pageSize: limit,
  totalPages: Math.ceil(totalRecords / limit),
});
