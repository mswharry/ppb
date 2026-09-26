// TODO: Hàm tạo URL an toàn và xử lý asset tương đối
//
// getRawUrl(source, filePath):
//   → Tạo URL raw.githubusercontent.com từ source config và path
//   → Mã hóa từng đoạn đường dẫn (encodeURIComponent)
//   → Ví dụ: https://raw.githubusercontent.com/USER/REPO/main/web/post.md
//
// resolveAssetUrl(assetPath, markdownFileUrl):
//   → Resolve đường dẫn ảnh/file tương đối so với thư mục chứa file .md
//   → Xử lý ../images/a.png, ./image.png, v.v.
//   → Return URL tuyệt đối
//
// getRepoUrl(source):
//   → URL trang GitHub của repo (để link "xem trên GitHub")
