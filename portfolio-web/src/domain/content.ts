// TODO: Domain types và logic chuẩn hóa nội dung
//
// Các kiểu dữ liệu cần định nghĩa:
//
// Source: { id, owner, repo, ref }
//   → Mô tả một repo nội dung
//
// CatalogPost (dữ liệu thô từ portfolio.json):
//   { slug, title, kind, publishedAt, summary, tags, path }
//
// PostSummary (sau khi chuẩn hóa, thêm sourceId):
//   { sourceId, slug, title, kind, publishedAt, summary, tags, path }
//
// Hàm normalizeCatalog(raw, sourceId):
//   - Kiểm tra các trường bắt buộc
//   - Bỏ bài thiếu dữ liệu hoặc slug trùng
//   - Gắn sourceId vào mỗi bài
//   - Return PostSummary[]
