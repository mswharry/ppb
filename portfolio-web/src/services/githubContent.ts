// TODO: Service tải nội dung từ GitHub
//
// fetchCatalog(source):
//   → Tải portfolio.json từ repo
//   → Gọi normalizeCatalog để chuẩn hóa
//   → Return PostSummary[]
//
// fetchAllCatalogs(sources):
//   → Dùng Promise.allSettled để tải từ tất cả sources
//   → Nguồn lỗi ghi nhận nhưng không ảnh hưởng nguồn khác
//   → Return { posts: PostSummary[], errors: Error[] }
//
// fetchMarkdown(source, path):
//   → Tải nội dung file .md từ raw URL
//   → Return string (nội dung Markdown)
