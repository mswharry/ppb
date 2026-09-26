// TODO: Custom hook quản lý state tải bài viết
// Chỉ tạo khi state tải dữ liệu bắt đầu lặp lại giữa các component
//
// usePosts():
//   → Tải catalogs khi mount
//   → Return { posts, loading, errors }
//
// Lưu ý: ban đầu có thể dùng useState + useEffect trực tiếp trong page,
// chỉ extract thành hook khi thấy logic bị lặp.
