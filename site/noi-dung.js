/* =========================================================
   NỘI DUNG CHUNG CỦA WEBSITE
   Trang chủ, Thư viện và Blog đều đọc danh sách ở file này.
   Khi có nội dung mới, chỉ cần thêm MỘT mục vào đúng danh sách
   bên dưới, các trang tự cập nhật (kể cả số đếm trên trang chủ).
   Xem hướng dẫn chi tiết trong tai-lieu/HUONG-DAN.md, mục "Thêm nội dung mới".
   ========================================================= */

/* ---------- SÁCH (trang Thư viện) ----------
   status: "doc-ngay" (đã đọc được) hoặc "sap-co" (sắp ra mắt)
   (Sách vẫn thêm tay ở đây vì mỗi cuốn là một trang HTML riêng.)
   Thêm cuốn mới xuống CUỐI danh sách. Trang chủ lấy 3 cuốn "doc-ngay" ở cuối.
   anh: ảnh bìa (để "" thì dùng bìa màu c1, c2). vitri: vị trí cắt ảnh.   */
var BOOKS=[
  {id:"mountain",ten:"The Mountain Is You",mota:"Ghi chú đọc về tự phá hoại, nhu cầu chưa được đáp ứng và cách đứng cùng ngọn núi của chính mình.",chude:"Phát triển bản thân",status:"sap-co",link:"the-mountain-is-you.html",anh:"anh/the-mountain-is-you-bia.jpg",chu:false,vitri:"50% 40%",gia:null,giaGoc:null,c1:"#17301d",c2:"#4a9b60",noibat:true},
  {id:"tu-chon-lay-minh",ten:"Tự chọn lấy mình",mota:"Ghi chú đọc từ cuộc trò chuyện Mel Robbins × Seth Godin: lực cản, tự chọn lấy mình và làm xong thay vì chờ hoàn hảo.",chude:"Làm nghề sáng tạo",status:"doc-ngay",link:"tu-chon-lay-minh.html",anh:"anh/tu-chon-lay-minh-bia.jpg",chu:false,vitri:"50% 25%",gia:null,giaGoc:null,c1:"#8a6421",c2:"#c2923d",noibat:true},
  {id:"marketing-huong-noi",ten:"Marketing cho người hướng nội",mota:"Hệ thống marketing vừa vặn với năng lượng của bạn: định vị điềm tĩnh, nội dung bền vững, kết nối có chiều sâu và bán hàng không áp lực.",chude:"Marketing",status:"doc-ngay",link:"marketing-cho-nguoi-huong-noi.html",anh:"anh/marketing-cho-nguoi-huong-noi-bia.svg",chu:false,vitri:"50% 50%",gia:null,giaGoc:null,c1:"#17301d",c2:"#4a9b60",noibat:true},
  {id:"giao-tiep-tu-tin",ten:"Nếu bạn hay đắn đo nên nói gì trước người khác, hãy đọc cuốn sách này",mota:"Cẩm nang giao tiếp tự tin và ứng biến tự nhiên trước mọi người, đúc kết từ Vinh Giang và Mel Robbins.",chude:"Giao tiếp",status:"doc-ngay",link:"giao-tiep-tu-tin.html",anh:"anh/giao-tiep-tu-tin-bia.jpg",chu:false,vitri:"50% 36%",gia:null,giaGoc:null,c1:"#3b2a1a",c2:"#8a6421",noibat:true}
];

/* ---------- BÀI VIẾT (trang Blog) : TỰ ĐỘNG ----------
   Không sửa tay. Thêm bài: tạo blog/<ngày>-<slug>/bai-viet.md rồi chạy
   node scripts/build.mjs (hoặc push lên GitHub, tự chạy).
   Giữ lại ghi chú về trường dữ liệu bên dưới để tham khảo:
   ngay: định dạng năm-tháng-ngày. Bài mới nhất hiện trên cùng
   (cùng ngày thì bài đứng trước trong danh sách hiện trước).
   noibat:true cho bài to nhất; nếu không có bài nào thì lấy bài mới nhất.
   chude: tối đa 2 nhãn. phut: số phút đọc.                                */
/* AUTO:POSTS:BEGIN (tự sinh từ các file bai-viet.md trong blog bởi scripts/build.mjs, đừng sửa tay) */
var POSTS=[
  {"id":"xa-vai-nu-cuong","ten":"Xả vai nữ cường, và một góc nhỏ để trò chuyện với bóng tối của mình","tomtat":"Câu chuyện đằng sau Shadow Work 7-day Journal, một góc trú ẩn nho nhỏ để mỗi ngày tháo mặt nạ ra và viết thật với chính mình.","chude":["Shadow Work","Viết để chữa lành"],"ngay":"2026-11-23","phut":5,"link":"xa-vai-nu-cuong.html","anh":"anh/xa-vai-nu-cuong.jpg","vitri":"top","noibat":true},
  {"id":"cong-viec-dang-gan-bo","ten":"Một công việc đáng để gắn bó lâu dài sẽ không xuất hiện ngay lập tức","tomtat":"Đọc thư của James Clear một buổi sáng, và bốn câu hỏi giúp mình tìm ra công việc đủ vui, đủ nuôi sống mình và đủ giữ mình là chính mình.","chude":["Sự nghiệp","Tự soi chiếu"],"ngay":"2026-11-23","phut":5,"link":"cong-viec-dang-gan-bo.html","anh":"anh/cong-viec-dang-gan-bo.jpg","vitri":"50% 50%"},
  {"id":"toxic-productivity","ten":"Toxic productivity","tomtat":"Chín tháng tạm nghỉ side jobs, và câu chuyện về \"năng suất độc hại\" mà ai từng mơ làm solobiz chắc cũng đi qua.","chude":["Sống chậm","Sức khỏe tinh thần"],"ngay":"2026-11-23","phut":4,"link":"toxic-productivity.html","anh":"anh/toxic-productivity.jpg","vitri":"50% 50%"},
  {"id":"demo-bai-viet","ten":"Bài viết demo: một ghi chép nhỏ sắp được đăng","tomtat":"Đây là bài demo để giữ chỗ cho layout. Khi có bài mới, bài này sẽ tự nhường chỗ.","chude":["Demo"],"ngay":"2026-11-20","phut":3,"link":"blog.html","anh":"anh/ve-sketch.jpg","vitri":"50% 40%","demo":true}
];
/* AUTO:POSTS:END */

/* ---------- DỰ ÁN (hiện ở trang chủ) ----------
   Trang Dự án (du-an.html) vẫn viết tay vì có phần mô tả chi tiết riêng.
   ngoai:true nếu link mở sang trang web khác (mở tab mới).                */
var PROJECTS=[
  {id:"cam-nang",ten:"Cẩm nang tâm lý học về giá trị bản thân",mota:"Giải mã vì sao giá trị của mình hay dao động theo thành tích và lời khen, rồi từng bước xây lại một nền móng vững hơn.",nhan:"Cẩm nang đọc trên web",bia:"Giá trị bản thân bền vững",phu:"Tâm lý học · Bài tập thực hành",chips:["Đọc ngay","Cẩm nang tương tác"],cta:"Đọc cẩm nang",link:"camnang-tamlyhoc-giatricanhan.html",ngoai:false,c1:"#8a6421",c2:"#c2923d",noibat:true},
  {id:"shadow-work",ten:"Shadow Work: 7 ngày đối thoại nội tâm",mota:"Một nhật ký trên web để gọi tên những phần bị cất giấu trong mình, dựa trên khái niệm \"Bóng tối\" của Carl Jung.",nhan:"Hành trình 7 ngày",bia:"Shadow Work",phu:"Đối thoại nội tâm · 15 phút mỗi ngày",chips:["Đã ra mắt","Nhật ký tương tác"],cta:"Bắt đầu hành trình",link:"https://shadowwork-journal.pages.dev/",ngoai:true,c1:"#17301d",c2:"#4a9b60",noibat:true}
];

/* AUTO:PROJECTS:BEGIN (tự sinh từ các file thong-tin.md trong du-an bởi scripts/build.mjs, đừng sửa tay) */
var PROJECTS_TU_DONG=[

];
/* AUTO:PROJECTS:END */
PROJECTS=PROJECTS.concat(PROJECTS_TU_DONG);

/* ---------- HÀM DÙNG CHUNG ---------- */
var MF={
  esc:function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})},
  /* "2026-11-23" -> "23/11/2026" (full) hoặc "23/11" */
  ngay:function(iso,full){var p=String(iso).split("-");return p[2]+"/"+p[1]+(full?"/"+p[0]:"")},
  /* bài mới nhất trước; cùng ngày giữ thứ tự trong danh sách */
  postsMoiNhat:function(){
    return POSTS.map(function(p,i){return{p:p,i:i}}).sort(function(a,b){
      return a.p.ngay<b.p.ngay?1:a.p.ngay>b.p.ngay?-1:a.i-b.i;
    }).map(function(x){return x.p});
  },
  arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  ext:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'
};
