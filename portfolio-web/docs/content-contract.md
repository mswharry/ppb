# Hợp đồng nội dung (Content Contract)

## portfolio.json

Mỗi repo nội dung đặt file `portfolio.json` ở gốc repo với cấu trúc:

```json
{
  "schemaVersion": 1,
  "posts": [
    {
      "slug": "ten-bai-viet",
      "title": "Tiêu đề bài viết",
      "kind": "writeup | blog | report",
      "publishedAt": "YYYY-MM-DD",
      "summary": "Tóm tắt ngắn gọn",
      "tags": ["Tag1", "Tag2"],
      "path": "folder/ten-bai-viet.md"
    }
  ]
}
```

## Quy ước

| Trường | Quy tắc |
| --- | --- |
| `schemaVersion` | Luôn là `1` cho phiên bản hiện tại |
| `slug` | Duy nhất trong cùng repo; chỉ chữ thường, số, dấu `-` |
| `kind` | Một trong: `writeup`, `blog`, `report` |
| `publishedAt` | Chuỗi ngày `YYYY-MM-DD`; do tác giả quyết định |
| `path` | Đường dẫn tương đối từ gốc repo; không bắt đầu `/`; không chứa `..` |
| `tags` | Nhãn viết thống nhất để lọc chính xác |

## Định danh toàn cục

Cặp `(sourceId, slug)` xác định duy nhất một bài viết.
- URL: `/posts/:sourceId/:slug`
- Ví dụ: `/posts/ctf/sqli-login-bypass`

## Thêm bài mới

1. Viết file `.md` trong repo nội dung
2. Thêm entry vào `portfolio.json`
3. Commit và push → Portfolio tự hiển thị bài mới

## Thêm repo mới

1. Tạo repo public mới với `portfolio.json`
2. Thêm entry vào `src/config/sources.ts`
3. Rebuild/redeploy portfolio
