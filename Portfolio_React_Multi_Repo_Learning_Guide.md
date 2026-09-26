# Hướng dẫn học và xây dựng portfolio React với nội dung từ nhiều repo GitHub

**Mục tiêu:** tạo một static website gồm giới thiệu, kỹ năng, liên hệ, CTF write-up, blog/learning report và achievements. Nội dung Markdown/ảnh/tài liệu được lưu trong các repo public riêng. Portfolio tải danh mục nhỏ khi mở site, chỉ tải Markdown của bài được xem. Bạn sẽ học cả lập trình web và cách thiết kế một hệ thống quản lý nội dung đơn giản.

**Cách dùng tài liệu:** làm theo từng mốc; sau mỗi mốc tự giải thích được luồng dữ liệu và hoàn thành phần “Kiểm tra xong mốc” trước khi chuyển tiếp. Lộ trình 6 tuần là gợi ý với khoảng 6–8 giờ/tuần; có thể kéo dài theo lịch học.

## 1. Chốt phạm vi phiên bản đầu

- Trang chủ: giới thiệu, kỹ năng, dự án nổi bật, liên hệ.
- Trang nội dung: danh sách có loại bài, tag, tiêu đề, ngày và tóm tắt; bộ lọc đơn giản.
- Trang chi tiết: Markdown, bảng, code block, hình ảnh, liên kết đến repo gốc.
- Trang achievements: dữ liệu viết trực tiếp trong repo portfolio; mỗi mục có thể dẫn tới minh chứng.
- Hiển thị trạng thái đang tải, lỗi tải và bài không tìm thấy; hỗ trợ màn hình điện thoại.
- Deploy static site, kiểm tra URL chi tiết sau khi tải lại trang.

**Để sau:** đăng nhập, CMS, database, bình luận, full-text search trên toàn bộ Markdown, chạy code từ bài viết, đồng bộ tự động bằng webhook. Đó là các bài toán riêng; phiên bản đầu đủ để học luồng dữ liệu từ nhiều nguồn.

## 2. Quyết định công nghệ và lý do

| Thành phần | Chọn | Kiến thức luyện được |
| --- | --- | --- |
| Giao diện | React + TypeScript | Component, props, state, kiểu dữ liệu, tổ chức module |
| Build | Vite `react-ts` | Dev server, npm scripts, bundling, phân biệt code nguồn và bản deploy |
| Điều hướng | React Router, Declarative mode | URL, route động, trang 404, điều hướng client |
| Nội dung | `react-markdown` + `remark-gfm` | Parse nội dung, tách dữ liệu khỏi giao diện, bảng/code block |
| CSS | CSS Modules + CSS variables | Layout, responsive, tái sử dụng style mà vẫn hiểu CSS nền tảng |
| Dữ liệu bên ngoài | `fetch` + file `portfolio.json` trong mỗi repo | HTTP, JSON, async/await, lỗi mạng, cache, hợp đồng dữ liệu |
| Lưu trữ | GitHub repo public riêng cho từng nhóm nội dung | Version control, tổ chức nội dung, nguồn dữ liệu phân tán |
| Deploy | Netlify trước; GitHub Pages là phương án khác | Build pipeline và quy tắc fallback cho client routes |

Bắt đầu với JavaScript căn bản rồi học TypeScript theo những kiểu dữ liệu dự án cần; không cần học hết Handbook mới viết React. Đừng thêm thư viện quản lý state cho các bộ lọc ban đầu.

## 3. Kiến trúc repo và hợp đồng nội dung

Có thể dùng một repo giao diện và ba repo nội dung. Tên sau là ví dụ, thay bằng tên repo thật của bạn.

```text
portfolio-web/                         # React app, KHÔNG lưu bản copy của bài viết
├── public/
│   ├── favicon.svg
│   └── _redirects                   # Chỉ dùng khi deploy Netlify: /* /index.html 200
├── src/
│   ├── app/
│   │   ├── App.tsx                   # Khung layout, routes
│   │   └── routes.tsx                # Định nghĩa route, hoặc viết ngay trong App.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   ├── TagFilter.tsx
│   │   ├── MarkdownView.tsx           # Render Markdown, sửa đường dẫn ảnh/link
│   │   └── LoadingState.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PostsPage.tsx
│   │   ├── PostDetailPage.tsx
│   │   ├── AchievementsPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── config/
│   │   └── sources.ts                # Danh sách repo cần đọc, không chứa token
│   ├── data/
│   │   ├── profile.ts
│   │   └── achievements.ts
│   ├── domain/
│   │   ├── content.ts                # Post, Source, Catalog; chuẩn hóa và kiểm tra dữ liệu
│   │   └── urls.ts                   # Tạo URL an toàn, xử lý asset tương đối
│   ├── services/
│   │   └── githubContent.ts          # Tải catalog và Markdown
│   ├── hooks/
│   │   └── usePosts.ts               # Chỉ tạo khi state tải dữ liệu bắt đầu lặp
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── docs/
│   ├── architecture.md               # Sơ đồ luồng và các quyết định thiết kế
│   └── content-contract.md           # Mẫu dữ liệu/đường dẫn cho các repo nội dung
├── package.json
├── vite.config.ts
└── README.md

ctf-writeups/
├── portfolio.json                    # Chỉ mục để site hiển thị danh sách
├── web/
│   ├── sqli-login-bypass.md
│   └── images/request.png
└── forensics/
    └── memory-analysis.md

learning-blog/
├── portfolio.json
├── web/
│   └── how-http-works.md
└── linux/
    └── file-permissions.md

learning-reports/
├── portfolio.json
├── network/
│   ├── ospf-architecture.md
│   └── ospf-architecture.pdf
└── malware-analysis/
    └── indicators.md
```

Nếu hiện tại chưa có nhiều bài, chỉ tạo **một repo nội dung mẫu** trước. Thêm repo thứ hai sau khi luồng tải một repo hoạt động.

### 3.1. Hợp đồng `portfolio.json`

Mỗi repo nội dung đặt file `portfolio.json` ở gốc:

```json
{
  "schemaVersion": 1,
  "posts": [
    {
      "slug": "sqli-login-bypass",
      "title": "SQL Injection: Login Bypass",
      "kind": "writeup",
      "publishedAt": "2026-09-21",
      "summary": "Phân tích nguyên nhân, cách kiểm chứng và cách khắc phục.",
      "tags": ["Web", "SQLi"],
      "path": "web/sqli-login-bypass.md"
    }
  ]
}
```

Quy ước:

- `schemaVersion`: phiên bản của định dạng để sau này có thể thay đổi mà vẫn biết cách đọc.
- `slug`: duy nhất **trong cùng một nguồn**; chỉ dùng chữ thường, số và dấu `-`.
- `kind`: `writeup`, `blog` hoặc `report`; phân loại theo nội dung, không suy ra từ tên repo.
- `path`: đường dẫn Markdown tương đối từ gốc repo, không bắt đầu bằng `/` và không chứa `..`.
- `publishedAt`: chuỗi ngày `YYYY-MM-DD`; do tác giả quyết định, không lấy ngày commit làm ngày xuất bản.
- `tags`: nhãn có quy ước viết thống nhất để lọc chính xác.
- Bài chưa muốn công khai: chưa thêm vào `portfolio.json`; các repo public vẫn cho người khác đọc file nếu biết URL.

Trong `portfolio-web/src/config/sources.ts`:

```ts
export const sources = [
  { id: "ctf", owner: "YOUR_USER", repo: "ctf-writeups", ref: "main" },
  { id: "blog", owner: "YOUR_USER", repo: "learning-blog", ref: "main" },
  { id: "reports", owner: "YOUR_USER", repo: "learning-reports", ref: "main" },
] as const;
```

**Định danh toàn cục:** cặp `(source.id, slug)`. Dùng URL `/posts/:sourceId/:slug`, ví dụ `/posts/ctf/sqli-login-bypass`; hai repo có cùng slug vẫn không xung đột. Metadata dùng cho danh sách; chỉ tải `path` của bài khi mở trang chi tiết.

### 3.2. Luồng dữ liệu

1. Khi mở trang danh sách, `githubContent.ts` tải `portfolio.json` từ từng repo và chuẩn hóa thành `PostSummary` có `sourceId`.
2. Danh sách sắp theo `publishedAt`, sau đó lọc `kind` và `tags`; không cần tải các file `.md`.
3. Trang chi tiết đọc `sourceId` và `slug` từ URL, tìm metadata rồi tải đúng file `path`.
4. `MarkdownView` render Markdown; ảnh dùng URL tuyệt đối được xây từ **thư mục chứa file Markdown**. Link `.md` nội bộ có thể điều hướng về portfolio nếu bài đó nằm trong danh mục; các link còn lại mở nguồn tương ứng.
5. Nếu một repo lỗi, ghi nhận lỗi của repo đó nhưng vẫn hiện bài của repo khác; nếu bài bị xóa hoặc đổi đường dẫn thì hiển thị lỗi có liên kết về repo.

Sơ đồ trách nhiệm: `config` cho biết nguồn nào tồn tại → `services` lấy dữ liệu → `domain` kiểm tra/chuẩn hóa → `pages` chọn nội dung → `components` trình bày.

### 3.3. Raw URL, API và file đính kèm

Ví dụ URL Markdown public: `https://raw.githubusercontent.com/USER/REPO/main/web/post.md`. Tạo URL từ `owner`, `repo`, `ref` và các đoạn của `path`; mã hóa từng đoạn đường dẫn, không nối chuỗi từ tham số URL của người xem mà không kiểm tra. Khi resolve `../images/a.png`, dùng URL cơ sở của **chính file Markdown**. Kiểm tra trên trình duyệt thật vì nội dung tải qua domain khác; nếu có vấn đề với raw endpoint, GitHub REST Contents API là lựa chọn có tài liệu về CORS, nhưng giới hạn request không xác thực là 60 yêu cầu/giờ theo IP.

PDF: cho link xem/tải và có thể nhúng khi cần. DOCX/ZIP: hiển thị mô tả + link tới GitHub hoặc tải file. Không đưa các artifact lớn vào JavaScript bundle, và không tự động tải chúng trong danh sách. Repo private cần server trung gian; tuyệt đối không đặt GitHub token vào React client.

## 4. Lộ trình học theo đầu ra

| Mốc | Thời lượng gợi ý | Học đủ để làm | Việc code | Kiểm tra xong mốc |
| --- | --- | --- | --- | --- |
| 0. Web và Git | 3–5 buổi | HTML semantic, CSS box model/flex/grid, JS `map`/`filter`, module, Promise, `fetch`, HTTP status, Git cơ bản | Viết trang HTML/CSS nhỏ và fetch JSON mẫu | Giải thích được request → response → render và `response.ok` |
| 1. Thiết kế dữ liệu | 2–3 buổi | Thực thể, thuộc tính, khóa định danh, schema, đường dẫn, phân loại | Vẽ sitemap; tạo 1 repo nội dung, 1 file `.md`, 1 `portfolio.json` | Mô tả được vì sao `(sourceId, slug)` xác định duy nhất một bài |
| 2. React cơ bản | 4–5 buổi | Component, props, danh sách, state, effect ở mức cần thiết | Dựng trang chủ, PostCard, trang danh sách bằng dữ liệu mẫu trong code | Giao diện chạy tốt trên máy/điện thoại; lọc được bài mẫu |
| 3. Routing và TypeScript | 3–4 buổi | Interface/type, union, optional field, route động, params | Tạo `/posts/:sourceId/:slug`, trang 404, `PostSummary` | Refresh URL bài tại local vẫn mở đúng bài |
| 4. Nội dung từ GitHub | 4–6 buổi | Async/await, Promise.allSettled, loading/error/empty, kiểm tra dữ liệu JSON, CORS | Tải catalog từng repo; chỉ tải `.md` khi mở bài; render Markdown và ảnh | Tắt một nguồn vẫn xem được nguồn khác; ảnh tương đối hiển thị đúng |
| 5. Hoàn thiện | 3–5 buổi | Responsive, accessibility, SEO cơ bản, build | Achievements, menu mobile, focus, trang lỗi, metadata cơ bản | Dùng được bằng bàn phím; không có link/ảnh hỏng trong bài mẫu |
| 6. Deploy | 1–2 buổi | Build output, SPA fallback, cache | `npm run build`, deploy Netlify, thử URL trực tiếp | Gửi link bài cho người khác mở được; refresh không ra 404 |

Thời lượng là gợi ý; ưu tiên đạt điều kiện kiểm tra của mốc hơn là chạy theo lịch.

### Tài liệu học đúng lúc

- Trước mốc 0: [MDN Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development) và [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
- Mốc 1–2: [React Learn](https://react.dev/learn), tập trung “Thinking in React”, “Describing the UI” và “Adding Interactivity”.
- Mốc 2–3: [Vite Getting Started](https://vite.dev/guide/) và [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro); tra cứu kiểu dữ liệu khi gặp trong dự án.
- Mốc 3: [React Router Declarative Routing](https://reactrouter.com/start/declarative/routing).
- Mốc 4: [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm), [GitHub raw files](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits), [GitHub API CORS](https://docs.github.com/en/rest/using-the-rest-api/using-cors-and-jsonp-to-make-cross-origin-requests) và [API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).
- Mốc 6: [Vite Deploying a Static Site](https://vite.dev/guide/static-deploy) và [Netlify JavaScript SPAs](https://docs.netlify.com/build/configure-builds/javascript-spas/).

Cách đọc: đặt câu hỏi cụ thể từ chức năng sắp làm (ví dụ: “làm sao lấy `slug` từ route?”), đọc mục tương ứng, viết thử một ví dụ nhỏ rồi áp dụng vào repo. Sau khi hoàn thành chức năng, ghi lại trong `docs/architecture.md` tại sao bạn chọn cách đó.

## 5. Bắt đầu trong buổi code đầu tiên

1. Kiểm tra Node và npm: `node -v`, `npm -v`. Theo tài liệu Vite hiện hành, dùng Node đáp ứng mức yêu cầu của bản Vite đang cài (tài liệu tại thời điểm soạn: 20.19+ hoặc 22.12+).
2. Tạo dự án:

   ```bash
   npm create vite@latest portfolio-web -- --template react-ts
   cd portfolio-web
   npm install
   npm run dev
   ```

3. Tạo 1 repo nội dung mẫu public với `portfolio.json`, một file `.md` và một ảnh. Truy cập URL Raw của cả JSON/Markdown/ảnh để chắc chắn đường dẫn đúng.
4. Trong React, tạo `HomePage`, `PostsPage` và `PostCard` bằng **hai bài mẫu nội bộ** trước. Học props, `map`, `key`, CSS.
5. Cài router và Markdown khi cần: `npm install react-router react-markdown remark-gfm`. Theo hướng dẫn React Router Declarative mode hiện hành, import các thành phần như `BrowserRouter`, `Routes`, `Route` từ `react-router`.
6. Thay dữ liệu mẫu bằng catalog từ repo sau khi giao diện danh sách đã chạy. Thêm repo thứ hai chỉ khi luồng một repo thành công.

**Kết quả buổi đầu:** một app Vite mở được ở localhost, một repo nội dung có contract hợp lệ, và commit đầu tiên ghi lại mục tiêu + sitemap trong README. Chưa cần làm toàn bộ giao diện ngay.

## 6. Những lỗi hay gặp và cách tự kiểm tra

| Triệu chứng | Kiểm tra đầu tiên |
| --- | --- |
| JSON/Markdown 404 | Tên repo, nhánh `main`, phân biệt chữ hoa/thường, path tương đối, URL raw |
| Fetch bị chặn | Mở DevTools → Network/Console; kiểm tra CORS, status, URL; thử REST Contents API nếu cần |
| Danh sách có bài nhưng chi tiết không mở | `sourceId` + `slug` trong route có khớp catalog; `path` có đúng không |
| Ảnh Markdown hỏng | URL ảnh phải tính từ thư mục file `.md`, kể cả đường dẫn `../images/...` |
| Một repo lỗi làm mất toàn bộ danh sách | Xử lý từng nguồn độc lập, chẳng hạn `Promise.allSettled` |
| Tải lại URL chi tiết bị 404 sau deploy | Kiểm tra SPA fallback/rewrite trên hosting; riêng GitHub Pages cân nhắc `HashRouter` |
| TypeScript không báo lỗi dù JSON sai | TypeScript chỉ kiểm tra lúc viết/build; dữ liệu tải từ xa cần kiểm tra ở runtime |
| Bài viết mới không hiện | Kiểm tra `portfolio.json`, cache, nhánh và trạng thái public của repo |

Không bật xử lý HTML tùy ý trong Markdown nếu chưa hiểu cơ chế làm sạch nội dung. `react-markdown` an toàn theo mặc định, nhưng plugin và cách tùy biến URL có thể thay đổi mức độ an toàn. Tự viết các kiểm tra thiết thực cho `normalizeCatalog` (bài thiếu trường, slug trùng) và `resolveAssetUrl` (ảnh cùng thư mục, ảnh ở thư mục cha); đây là những phần dễ sai và đáng test.

## 7. Kiểm tra hoàn thành và hướng phát triển sau

Phiên bản đầu hoàn thành khi:

- [ ] Có đủ trang chủ, danh sách bài, chi tiết, achievements và 404.
- [ ] Ít nhất hai repo nội dung được đọc; không copy Markdown vào repo portfolio.
- [ ] Chỉ tải nội dung `.md` khi mở bài; PDF/DOCX không tải trên trang danh sách.
- [ ] Danh sách lọc được theo `kind` và tag; nguồn lỗi không làm mất nguồn khác.
- [ ] Ảnh, liên kết, bảng và code block của bài mẫu hiển thị đúng.
- [ ] Có loading, empty, error; dùng được trên điện thoại và bàn phím.
- [ ] `npm run build` thành công; URL bài mở trực tiếp và tải lại vẫn hoạt động.
- [ ] README giải thích cách thêm repo mới, thêm bài mới và deploy.

**Sau phiên bản đầu:** học pre-render/SSG nếu muốn từng bài có HTML riêng để công cụ tìm kiếm và preview mạng xã hội đọc tốt hơn; thêm kiểm tra contract trong CI của repo nội dung; thêm tìm kiếm toàn văn bằng chỉ mục build-time nếu số bài lớn. Với mô hình fetch Markdown ở runtime, trang tĩnh vẫn hoạt động nhưng HTML ban đầu không chứa nội dung bài chi tiết, nên SEO/preview có giới hạn.

---

### Nguồn chính để đối chiếu khi công cụ thay đổi

[Vite Guide](https://vite.dev/guide/) · [Vite Static Deploy](https://vite.dev/guide/static-deploy) · [React Learn](https://react.dev/learn) · [React Router](https://reactrouter.com/start/declarative/routing) · [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro) · [react-markdown](https://github.com/remarkjs/react-markdown) · [GitHub REST API](https://docs.github.com/en/rest) · [Netlify SPA](https://docs.netlify.com/build/configure-builds/javascript-spas/).
