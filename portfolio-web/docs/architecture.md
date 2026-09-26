# Kiến trúc Portfolio Web

## Sơ đồ luồng dữ liệu

```
config/sources.ts (nguồn nào tồn tại)
        ↓
services/githubContent.ts (tải portfolio.json + .md)
        ↓
domain/content.ts (kiểm tra / chuẩn hóa dữ liệu)
        ↓
pages/ (chọn nội dung hiển thị)
        ↓
components/ (trình bày UI)
```

## Quyết định thiết kế

<!-- Ghi lại lý do bạn chọn cách làm sau mỗi chức năng hoàn thành -->

### Routing
- TODO: Giải thích cách cấu trúc route `/posts/:sourceId/:slug`

### Tải dữ liệu
- TODO: Giải thích vì sao dùng Promise.allSettled

### Render Markdown
- TODO: Giải thích cách xử lý ảnh tương đối

### CSS
- TODO: Giải thích vì sao dùng CSS Modules + CSS variables
