# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

## 1. GIỚI THIỆU

### 1.1. Mục đích của tài liệu
Tài liệu này mô tả chi tiết các yêu cầu chức năng và phi chức năng cho hệ thống: **EngBuddy - English Learning Platform**. Tài liệu là cơ sở để phát triển, kiểm thử, triển khai và bảo trì hệ thống.

### 1.2. Phạm vi của sản phẩm
- Xây dựng hệ thống **EngBuddy - English Learning Platform**: nền tảng học tiếng Anh tích hợp AI, hỗ trợ tra cứu từ điển, luyện tập, hội thoại, luyện nói và quản lý tiến độ học tập cho người Việt.
- Hệ thống hỗ trợ các vai trò: Người dùng (học viên, giáo viên), Quản trị viên.
- Sản phẩm là một ứng dụng web (SPA), responsive, hoạt động trên các trình duyệt hiện đại và thiết bị di động.


### 1.3. Định nghĩa, từ viết tắt và thuật ngữ (Áp dụng cho EngBuddy)
- **EngBuddy**: Tên nền tảng học tiếng Anh tích hợp AI, giao diện hiện đại, đa thiết bị.
- **Dictionary Module**: Chức năng tra cứu từ điển, ví dụ, lưu yêu thích, lịch sử.
- **Exercises Module**: Chức năng tạo, làm, chấm điểm và lưu bài tập tiếng Anh cá nhân hóa.
- **AI Chat Module**: Trợ lý AI hội thoại, giải đáp, hướng dẫn học tập, lưu lịch sử chat.
- **Conversation Topics**: Module luyện nói theo chủ đề, hỗ trợ ghi âm, nhận diện giọng nói, phát âm.
- **User**: Người dùng cuối (học viên, giáo viên, khách truy cập).
- **Admin**: Quản trị viên hệ thống (quản lý nội dung, người dùng, thống kê).
- **Supabase**: Nền tảng backend (database, authentication, API) sử dụng cho dự án.
- **shadcn/ui**: Thư viện UI component hiện đại dùng cho giao diện.
- **React 18**: Framework xây dựng giao diện người dùng.
- **Vite**: Công cụ build và phát triển frontend.
- **TailwindCSS**: Framework CSS tiện dụng cho thiết kế responsive.
- **Speech Recognition**: Công nghệ nhận diện giọng nói (Web Speech API) tích hợp luyện nói.
- **Text-to-Speech (TTS)**: Công nghệ chuyển văn bản thành giọng nói (phát âm AI).
- **JWT**: JSON Web Token, dùng xác thực và phân quyền.
- **SPA**: Single Page Application (ứng dụng web một trang).
- **Responsive**: Giao diện thích ứng mọi thiết bị.
- **User Story**: Câu chuyện người dùng mô tả hành vi thực tế.

### 1.4. Tài liệu tham khảo
- Tài liệu phân tích nghiệp vụ, khảo sát người dùng
- Tài liệu thiết kế hệ thống, kiến trúc phần mềm
- [Link hoặc tên các tài liệu liên quan khác]

---

## 2. MÔ TẢ TỔNG QUAN

### 2.1. Quan điểm sản phẩm
- Sản phẩm là một hệ thống **[web/mobile]** độc lập, có thể tích hợp với các dịch vụ bên ngoài (ví dụ: email, lịch, chat).
- Hệ thống hướng tới nhóm người dùng nhỏ (3-20 người).

### 2.2. Chức năng sản phẩm
- Quản lý công việc, giao nhiệm vụ, theo dõi tiến độ.
- Thông báo, nhắc nhở tự động.
- Báo cáo tổng hợp, thống kê hiệu suất.
- Quản lý người dùng, phân quyền truy cập.

### 2.3. Đặc điểm người dùng
- Người dùng phổ thông, không yêu cầu kỹ năng CNTT cao.
- Có thể truy cập hệ thống từ máy tính, điện thoại, máy tính bảng.

### 2.4. Ràng buộc
- Hệ thống phải tuân thủ các quy định về bảo mật dữ liệu cá nhân.
- Giao diện hỗ trợ tiếng Việt và tiếng Anh.
- Thời gian phản hồi < 2 giây cho các thao tác chính.

### 2.5. Giả định và phụ thuộc
- Người dùng có kết nối Internet ổn định.
- Hệ thống sử dụng dịch vụ xác thực bên ngoài (ví dụ: Google, Facebook) nếu cần.

---

## 3. YÊU CẦU CỤ THỂ

### 3.1. Yêu cầu chức năng

#### 3.1.1. Quản lý công việc (Task Management)
- **Mô tả:** Cho phép tạo, sửa, xóa, phân công và theo dõi trạng thái công việc.
- **Đầu vào:** Thông tin công việc (tên, mô tả, hạn hoàn thành, người thực hiện).
- **Đầu ra:** Danh sách công việc, trạng thái, thông báo nhắc nhở.
- **Quy tắc nghiệp vụ:** Không cho phép trùng tên công việc trong cùng một dự án.

#### 3.1.2. Quản lý người dùng (User Management)
- **Mô tả:** Đăng ký, đăng nhập, phân quyền (admin/thành viên), cập nhật thông tin cá nhân.
- **Đầu vào:** Thông tin đăng ký, đăng nhập, cập nhật.
- **Đầu ra:** Thông báo xác nhận, danh sách người dùng.
- **Quy tắc nghiệp vụ:** Một email chỉ được đăng ký một tài khoản.

#### 3.1.3. Thông báo & nhắc nhở (Notification)
- **Mô tả:** Gửi thông báo khi có công việc mới, thay đổi trạng thái, sắp đến hạn.
- **Đầu vào:** Sự kiện hệ thống.
- **Đầu ra:** Thông báo trên giao diện, email (nếu cấu hình).
- **Quy tắc nghiệp vụ:** Thông báo chỉ gửi cho người liên quan.

#### 3.1.4. Báo cáo & thống kê (Reporting)
- **Mô tả:** Tổng hợp số lượng công việc, tiến độ, hiệu suất cá nhân/nhóm.
- **Đầu vào:** Dữ liệu công việc.
- **Đầu ra:** Biểu đồ, bảng thống kê.
- **Quy tắc nghiệp vụ:** Chỉ admin được xem báo cáo tổng hợp.

#### 3.1.5. Tìm kiếm & lọc (Search & Filter)
- **Mô tả:** Tìm kiếm công việc, người dùng theo nhiều tiêu chí.
- **Đầu vào:** Từ khóa, bộ lọc.
- **Đầu ra:** Danh sách kết quả phù hợp.

### 3.2. Yêu cầu phi chức năng

#### 3.2.1. Hiệu suất
- Thời gian phản hồi < 2 giây cho thao tác chính.
- Hệ thống hỗ trợ tối thiểu 100 người dùng đồng thời.

#### 3.2.2. Bảo mật
- Mã hóa dữ liệu nhạy cảm (mật khẩu, thông tin cá nhân).
- Phân quyền truy cập rõ ràng.
- Lưu nhật ký truy cập và thao tác quan trọng.

#### 3.2.3. Khả năng sử dụng
- Giao diện thân thiện, dễ sử dụng.
- Hỗ trợ đa thiết bị, đa trình duyệt.
- Có hướng dẫn sử dụng, trợ giúp trực tuyến.

#### 3.2.4. Khả năng mở rộng
- Dễ dàng bổ sung module mới (ví dụ: chat nhóm, tích hợp lịch).
- Kiến trúc microservice hoặc module hóa.

#### 3.2.5. Tính khả dụng
- Uptime ≥ 99.5%.
- Có cơ chế backup và phục hồi dữ liệu.

### 3.3. Yêu cầu khác

#### 3.3.1. Yêu cầu về giao diện bên ngoài (UI/UX)
- Thiết kế hiện đại, màu sắc hài hòa.
- Hỗ trợ dark mode.
- Responsive cho mọi thiết bị.

#### 3.3.2. Yêu cầu về hệ thống (môi trường hoạt động)
- Hệ điều hành: Windows, macOS, Linux, Android, iOS.
- Trình duyệt: Chrome, Firefox, Edge, Safari (bản mới nhất).

---

## 4. PHỤ LỤC: USE CASES / USER STORIES

### 4.1. Use Case: Tạo công việc mới
- **Là một** thành viên nhóm
- **Tôi muốn** tạo công việc mới với thông tin chi tiết
- **Để** quản lý và theo dõi tiến độ công việc của mình

### 4.2. Use Case: Giao nhiệm vụ cho thành viên
- **Là một** quản trị viên
- **Tôi muốn** phân công công việc cho thành viên cụ thể
- **Để** đảm bảo mọi người đều có nhiệm vụ rõ ràng

### 4.3. Use Case: Nhận thông báo khi có thay đổi
- **Là một** người dùng
- **Tôi muốn** nhận thông báo khi có công việc mới hoặc thay đổi trạng thái
- **Để** không bỏ lỡ các nhiệm vụ quan trọng

### 4.4. Use Case: Xem báo cáo tiến độ nhóm
- **Là một** quản trị viên
- **Tôi muốn** xem báo cáo tổng hợp về tiến độ và hiệu suất nhóm
- **Để** đánh giá và điều chỉnh kế hoạch làm việc

---

# PHÂN TÍCH YÊU CẦU PHẦN MẀM - ENGBUDDY
## English Learning Platform

---

## 📋 **THÔNG TIN DỰ ÁN**

| Thông tin | Chi tiết |
|-----------|----------|
| **Tên dự án** | EngBuddy - English Learning Platform |
| **Phiên bản** | 1.0.0 |
| **Ngày tạo** | August 2025 |
| **Công nghệ** | React 18 + TypeScript + Vite |
| **UI Framework** | TailwindCSS + shadcn/ui |
| **Backend** | Supabase |
| **Deployment** | GitHub Pages |

---

## 🎯 **TỔNG QUAN DỰ ÁN**

### **Mục đích**
EngBuddy là nền tảng học tiếng Anh trực tuyến được thiết kế dành riêng cho người học tiếng Việt, tích hợp công nghệ AI để cung cấp trải nghiệm học tập cá nhân hóa, hiệu quả và thân thiện.

### **Đối tượng người dùng**
- **Chính:** Người Việt Nam học tiếng Anh (mọi trình độ)
- **Phụ:** Giáo viên tiếng Anh, sinh viên, người đi làm

### **Phạm vi dự án**
- Web Application (Single Page Application)
- Responsive Design (Desktop + Mobile)
- Không yêu cầu đăng nhập bắt buộc
- Tích hợp AI Chat và Speech Recognition

---

## 📊 **PHÂN TÍCH YÊU CẦU CHỨC NĂNG**

### **1. 📖 TỪ ĐIỂN THÔNG MINH (Dictionary Module)**

#### **Yêu cầu chính:**
- **FR-D001:** Tra cứu từ vựng tiếng Anh với định nghĩa chi tiết
- **FR-D002:** Hiển thị ví dụ thực tế trong ngữ cảnh
- **FR-D003:** Gợi ý sử dụng trong nhiều tình huống khác nhau
- **FR-D004:** Tìm kiếm thông minh với gợi ý từ khóa
- **FR-D005:** Thêm từ vào danh sách yêu thích
- **FR-D006:** Lưu trữ lịch sử tra cứu

#### **Luồng xử lý:**
```
User Input → Validation → API Call → Dictionary Service → 
Result Processing → Display → Option to Save Favorite
```

#### **API Integration:**
- **Service:** `dictionaryService.ts`
- **Methods:** `searchWord()`, `addToFavorites()`
- **Error Handling:** Xử lý trường hợp không tìm thấy từ

---

### **2. 📝 BÀI TẬP CÁ NHÂN HÓA (Exercises Module)**

#### **Yêu cầu chính:**
- **FR-E001:** Tạo bài tập theo chủ đề được chọn
- **FR-E002:** 12 loại bài tập đa dạng (Multiple Choice, Fill in Blanks, v.v.)
- **FR-E003:** Hỗ trợ tối đa 100 câu hỏi mỗi lần
- **FR-E004:** Đánh giá và chấm điểm tự động
- **FR-E005:** Phân tích kết quả và đưa ra gợi ý cải thiện
- **FR-E006:** Lưu tiến độ học tập

#### **Loại bài tập được hỗ trợ:**
1. Multiple Choice (Trắc nghiệm)
2. Fill in the Blanks (Điền vào chỗ trống)
3. True/False (Đúng/Sai)
4. Matching (Nối từ)
5. Reorder (Sắp xếp lại)
6. Translation (Dịch)
7. Grammar Check (Kiểm tra ngữ pháp)
8. Vocabulary Building (Xây dựng từ vựng)
9. Reading Comprehension (Đọc hiểu)
10. Listening (Nghe)
11. Writing (Viết)
12. Speaking Practice (Luyện nói)

#### **Service Integration:**
- **Service:** `exerciseService.ts`
- **Methods:** `generateExercise()`, `checkAnswers()`, `saveProgress()`

---

### **3. 🤖 CHAT VỚI AI (AI Chat Module)**

#### **Yêu cầu chính:**
- **FR-C001:** Trò chuyện thời gian thực với AI
- **FR-C002:** Hỗ trợ hướng dẫn học tiếng Anh
- **FR-C003:** Giải thích ngữ pháp và từ vựng
- **FR-C004:** Đưa ra lời khuyên học tập cá nhân hóa
- **FR-C005:** Lưu lịch sử hội thoại
- **FR-C006:** Chế độ giáo viên ảo

#### **Tính năng nâng cao:**
- Context-aware conversations
- Multi-turn dialogue support
- Educational content integration
- Progress tracking through conversations

#### **Service Integration:**
- **Service:** `consultationService.ts`
- **Methods:** `sendMessage()`, `getConversationHistory()`

---

### **4. 🌍 CHỦ ĐỀ HỘI THOẠI (Conversation Topics)**

#### **Yêu cầu chính:**
- **FR-T001:** Luyện tập theo chủ đề cụ thể
- **FR-T002:** Hỗ trợ ghi âm giọng nói
- **FR-T003:** Phát âm và nghe lại
- **FR-T004:** Đánh giá phát âm (Speech Recognition)
- **FR-T005:** Đối thoại tương tác với AI
- **FR-T006:** Theo dõi tiến độ luyện nói

#### **Chủ đề được hỗ trợ:**
- Business & Work (Kinh doanh & Công việc)
- Travel & Tourism (Du lịch)
- Daily Life (Cuộc sống hàng ngày)
- Food & Dining (Ẩm thực)
- Health & Medicine (Sức khỏe)
- Education (Giáo dục)
- Technology (Công nghệ)
- Culture & Society (Văn hóa & Xã hội)

#### **Speech Technology:**
- **Web Speech API** integration
- **Voice Recording** capabilities
- **Text-to-Speech** playback
- **Speech Recognition** for pronunciation assessment

---

## 🔧 **YÊU CẦU KỸ THUẬT**

### **Frontend Architecture**
```
├── React 18 (UI Framework)
├── TypeScript (Type Safety)
├── Vite (Build Tool)
├── TailwindCSS (Styling)
├── shadcn/ui (Component Library)
├── Framer Motion (Animations)
├── React Router DOM (Navigation)
└── Lucide React (Icons)
```

### **State Management**
- **React Hooks** (useState, useEffect, useContext)
- **Custom Hooks** (useApi, useToast, useMobile)
- **Context API** (AuthContext, ThemeProvider)

### **Backend Services**
- **Supabase** (Database & Authentication)
- **REST API** integration
- **Real-time** data synchronization

### **Performance Requirements**
- **NFR-P001:** Thời gian tải trang < 3 giây
- **NFR-P002:** Phản hồi API < 2 giây
- **NFR-P003:** Hỗ trợ đồng thời 1000+ users
- **NFR-P004:** Uptime ≥ 99.5%

---

## 🎨 **YÊU CẦU GIAO DIỆN NGƯỜI DÙNG**

### **Design System**
- **Color Scheme:** Pink/Rose gradient theme
- **Typography:** Clean, modern fonts
- **Layout:** Responsive grid system
- **Components:** Consistent shadcn/ui components

### **Responsive Design**
- **Desktop:** ≥ 1200px
- **Tablet:** 768px - 1199px  
- **Mobile:** < 768px

### **Accessibility**
- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Dark/Light mode** toggle

### **User Experience**
- **NFR-UX001:** Intuitive navigation
- **NFR-UX002:** Minimal learning curve
- **NFR-UX003:** Fast content discovery
- **NFR-UX004:** Mobile-first design

---

## 🔐 **YÊU CẦU BẢO MẬT**

### **Authentication & Authorization**
- **Optional registration** (not mandatory)
- **Supabase Auth** integration
- **JWT token** management
- **Session persistence**

### **Data Security**
- **HTTPS** encryption
- **API rate limiting**
- **Input validation** and sanitization
- **XSS protection**

### **Privacy**
- **GDPR compliance** considerations
- **Data minimization** principle
- **User consent** management
- **Anonymous usage** support

---

## 📱 **YÊU CẦU TƯƠNG THÍCH**

### **Browser Support**
- **Chrome** ≥ 90
- **Firefox** ≥ 88
- **Safari** ≥ 14
- **Edge** ≥ 90

### **Device Support**
- **Desktop:** Windows, macOS, Linux
- **Mobile:** iOS 13+, Android 8+
- **Tablet:** iPad, Android tablets

### **Network Requirements**
- **Minimum:** 1 Mbps
- **Recommended:** 5 Mbps
- **Offline capability:** Limited features

---

## 🚀 **DEPLOYMENT & INFRASTRUCTURE**

### **Hosting**
- **Platform:** GitHub Pages
- **CDN:** Global content delivery
- **SSL:** Automatic HTTPS
- **Custom domain** support

### **CI/CD Pipeline**
```
Code Push → GitHub Actions → Build → Test → Deploy → Monitor
```

### **Environment Management**
- **Development:** Local Vite server
- **Staging:** Preview deployments
- **Production:** GitHub Pages

---

## 📈 **MONITORING & ANALYTICS**

### **Performance Monitoring**
- **Core Web Vitals** tracking
- **Error logging** and reporting
- **API response time** monitoring
- **User session** analysis

### **Usage Analytics**
- **Feature usage** statistics
- **User engagement** metrics
- **Learning progress** tracking
- **Conversion funnel** analysis

---

## 🔄 **MAINTENANCE & UPDATES**

### **Update Strategy**
- **Regular feature** releases
- **Security patch** management
- **Dependency updates**
- **Performance optimization**

### **Backup & Recovery**
- **Database backup** (Supabase managed)
- **Code repository** (Git version control)
- **Asset backup** (Static files)
- **Disaster recovery** plan

---

## 🧪 **TESTING REQUIREMENTS**

### **Testing Strategy**
- **Unit Tests:** Component and service testing
- **Integration Tests:** API and service integration
- **E2E Tests:** Complete user workflows
- **Performance Tests:** Load and stress testing

### **Quality Assurance**
- **Code review** process
- **Automated testing** pipeline
- **Manual testing** protocols
- **User acceptance** testing

---

## 📋 **CONCLUSION**

EngBuddy đại diện cho một nền tảng học tiếng Anh hiện đại, tích hợp công nghệ AI và thiết kế UX/UI tiên tiến. Dự án được xây dựng với kiến trúc module hóa, dễ bảo trì và mở rộng, đáp ứng nhu cầu học tập đa dạng của người dùng Việt Nam.

### **Key Success Factors:**
✅ **User-centric design** - Thiết kế tập trung vào người dùng  
✅ **AI Integration** - Tích hợp AI thông minh  
✅ **Performance** - Hiệu suất cao  
✅ **Accessibility** - Dễ tiếp cận  
✅ **Scalability** - Khả năng mở rộng  

---

**Document Version:** 1.0  
**Last Updated:** August 19, 2025  
**Prepared by:** Development Team  
**Status:** Active Development
