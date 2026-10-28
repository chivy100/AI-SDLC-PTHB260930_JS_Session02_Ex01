
// 1. HÀM TÍNH THÀNH TIỀN

function calcLineTotal(unitPrice, quantity) {
  // Kiểm tra đơn giá: không chấp nhận null, undefined hoặc boolean.
  if (unitPrice === null || unitPrice === undefined || typeof unitPrice === "boolean") {
    return null;
  }

  // Kiểm tra số lượng: không chấp nhận null, undefined hoặc boolean.
  if (quantity === null || quantity === undefined || typeof quantity === "boolean") {
    return null;
  }

  // Từ chối đơn giá dạng chuỗi rỗng hoặc chỉ chứa khoảng trắng.
  if (typeof unitPrice === "string" && unitPrice.trim() === "") {
    return null;
  }

  // Từ chối số lượng dạng chuỗi rỗng hoặc chỉ chứa khoảng trắng.
  if (typeof quantity === "string" && quantity.trim() === "") {
    return null;
  }

  // Chuyển đơn giá sang kiểu số để có thể thực hiện phép nhân.
  const price = Number(unitPrice);

  // Chuyển số lượng sang kiểu số để kiểm tra và tính toán.
  const qty = Number(quantity);

  // Number.isFinite() loại bỏ NaN, Infinity và -Infinity.
  if (!Number.isFinite(price) || !Number.isFinite(qty)) {
    return null;
  }

  // Đơn giá phải lớn hơn 0.
  if (price <= 0) {
    return null;
  }

  // Số lượng phải là số nguyên và lớn hơn hoặc bằng 1.
  if (qty < 1 || !Number.isInteger(qty)) {
    return null;
  }

  // Thành tiền = đơn giá × số lượng.
  return price * qty;
}


// 2. HÀM TÍNH THUẾ VAT (8%)

function calcVat(amount) {
  // Không chấp nhận null, undefined hoặc boolean.
  if (amount === null || amount === undefined || typeof amount === "boolean") {
    return null;
  }

  // Không chấp nhận chuỗi rỗng hoặc chỉ chứa khoảng trắng.
  if (typeof amount === "string" && amount.trim() === "") {
    return null;
  }

  // Chuyển số tiền đầu vào sang kiểu số.
  const numericAmount = Number(amount);

  // Chỉ chấp nhận số hữu hạn và không âm.
  if (!Number.isFinite(numericAmount) || numericAmount < 0) {
    return null;
  }

  // Tính thuế VAT bằng 8% số tiền đầu vào.
  return numericAmount * 0.08;
}


// 3. HÀM ĐỊNH DẠNG TIỀN TỆ VNĐ

function formatVnd(amount) {
  // Không chấp nhận null, undefined hoặc boolean.
  if (amount === null || amount === undefined || typeof amount === "boolean") {
    return null;
  }

  // Không chấp nhận chuỗi rỗng hoặc chỉ chứa khoảng trắng.
  if (typeof amount === "string" && amount.trim() === "") {
    return null;
  }

  // Chuyển dữ liệu đầu vào sang kiểu số.
  const numericAmount = Number(amount);

  // Từ chối giá trị không phải số hữu hạn.
  // Từ chối số thập phân vì số tiền cần định dạng phải là số nguyên.
  // Từ chối số âm và số tiền từ 1 tỷ trở lên.
  if (
    !Number.isFinite(numericAmount) ||
    !Number.isInteger(numericAmount) ||
    numericAmount < 0 ||
    numericAmount >= 1000000000
  ) {
    return null;
  }

  // Chuyển số thành chuỗi trước khi thêm dấu phân cách hàng nghìn.
  const formattedNumber = numericAmount
    .toString()
    // Thêm dấu chấm giữa các nhóm ba chữ số, tính từ phải sang trái.
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Ghép số đã định dạng với đơn vị tiền tệ VNĐ.
  return `${formattedNumber} đ`;
}


// 4. HÀM TẠO DÒNG HÓA ĐƠN

function buildReceiptLine(name, unitPrice, quantity) {
  // Tên hàng phải là chuỗi và không được rỗng sau khi loại khoảng trắng.
  if (typeof name !== "string" || name.trim() === "") {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  // Gọi hàm tính thành tiền để kiểm tra dữ liệu và lấy kết quả.
  const lineTotal = calcLineTotal(unitPrice, quantity);

  // Nếu thành tiền không hợp lệ, trả về thông báo lỗi.
  if (lineTotal === null) {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  // Tính VAT 8% dựa trên thành tiền đã được kiểm tra.
  const vat = calcVat(lineTotal);

  // Nếu VAT không hợp lệ, trả về thông báo lỗi.
  if (vat === null) {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  // Tổng tiền phải thanh toán = thành tiền + VAT.
  const total = lineTotal + vat;

  // Chuyển số lượng sang kiểu số để hiển thị thống nhất.
  const validQty = Number(quantity);

  // Loại bỏ khoảng trắng thừa ở đầu và cuối tên hàng.
  const trimmedName = name.trim();

  // Tạo dòng hóa đơn bằng template literal.
  // Gọi formatVnd() để định dạng thành tiền, VAT và tổng tiền.
  return `${trimmedName} x${validQty}: ${formatVnd(lineTotal)} + VAT ${formatVnd(vat)} = ${formatVnd(total)}`;
}


// 5. TEST CASE: calcLineTotal()

console.log("===== TEST calcLineTotal() =====");

// Kiểm tra đơn giá và số lượng dạng chuỗi số.
console.log(calcLineTotal("450000", "2"));
// Expected: 900000

// Kiểm tra đơn giá và số lượng dạng số.
console.log(calcLineTotal(450000, 2));
// Expected: 900000

// Kiểm tra số lượng bằng 0.
console.log(calcLineTotal(450000, 0));
// Expected: null

// Kiểm tra số lượng âm.
console.log(calcLineTotal(450000, -1));
// Expected: null

// Kiểm tra đơn giá bằng 0.
console.log(calcLineTotal(0, 2));
// Expected: null

// Kiểm tra đơn giá âm.
console.log(calcLineTotal(-50000, 2));
// Expected: null

// Kiểm tra đơn giá chứa ký tự không thể chuyển thành số.
console.log(calcLineTotal("abc", 2));
// Expected: null

// Kiểm tra số lượng chứa ký tự không thể chuyển thành số.
console.log(calcLineTotal(450000, "xyz"));
// Expected: null

// Kiểm tra số lượng thập phân.
console.log(calcLineTotal("450000", "1.5"));
// Expected: null

// Kiểm tra đơn giá là chuỗi rỗng.
console.log(calcLineTotal("", 2));
// Expected: null

// Kiểm tra cả hai đầu vào chỉ chứa khoảng trắng.
console.log(calcLineTotal("   ", "  "));
// Expected: null


// 6. TEST CASE: calcVat()

console.log("===== TEST calcVat() =====");

// Kiểm tra VAT 8% của 900.000.
console.log(calcVat(900000));
// Expected: 72000

// Kiểm tra đầu vào là chuỗi số.
console.log(calcVat("900000"));
// Expected: 72000

// Kiểm tra số tiền bằng 0.
console.log(calcVat(0));
// Expected: 0

// Kiểm tra VAT 8% của 1.000.
console.log(calcVat(1000));
// Expected: 80

// Kiểm tra số tiền âm.
console.log(calcVat(-1000));
// Expected: null

// Kiểm tra đầu vào không phải số hợp lệ.
console.log(calcVat("abc"));
// Expected: null

// Kiểm tra chuỗi rỗng.
console.log(calcVat(""));
// Expected: null

// Kiểm tra chuỗi chỉ chứa khoảng trắng.
console.log(calcVat("   "));
// Expected: null

// Kiểm tra đầu vào null.
console.log(calcVat(null));
// Expected: null


// 7. TEST CASE: formatVnd()

console.log("===== TEST formatVnd() =====");

// Kiểm tra giá trị nhỏ nhất hợp lệ.
console.log(formatVnd(0));
// Expected: "0 đ"

// Kiểm tra số có ba chữ số.
console.log(formatVnd(950));
// Expected: "950 đ"

// Kiểm tra thêm dấu phân cách hàng nghìn.
console.log(formatVnd(72000));
// Expected: "72.000 đ"

// Kiểm tra số tiền 450.000.
console.log(formatVnd(450000));
// Expected: "450.000 đ"

// Kiểm tra số tiền 900.000.
console.log(formatVnd(900000));
// Expected: "900.000 đ"

// Kiểm tra số tiền có hai dấu phân cách.
console.log(formatVnd(1250000));
// Expected: "1.250.000 đ"

// Kiểm tra giá trị lớn nhất hợp lệ.
console.log(formatVnd(999999999));
// Expected: "999.999.999 đ"

// Kiểm tra giá trị bằng 1 tỷ, không hợp lệ theo giới hạn đề bài.
console.log(formatVnd(1000000000));
// Expected: null

// Kiểm tra số tiền âm.
console.log(formatVnd(-1000));
// Expected: null

// Kiểm tra số thập phân.
console.log(formatVnd(15.5));
// Expected: null

// Kiểm tra chuỗi không thể chuyển thành số.
console.log(formatVnd("abc"));
// Expected: null


// 8. TEST CASE: buildReceiptLine()

console.log("===== TEST buildReceiptLine() =====");

// Kiểm tra hóa đơn hợp lệ và tên hàng có khoảng trắng thừa.
console.log(buildReceiptLine(" Tai nghe Bluetooth ", 450000, 2));
// Expected: "Tai nghe Bluetooth x2: 900.000 đ + VAT 72.000 đ = 972.000 đ"

// Kiểm tra đơn giá không hợp lệ.
console.log(buildReceiptLine("Áo thun", "abc", 2));
// Expected: "Dữ liệu dòng hàng không hợp lệ"

// Kiểm tra đơn giá và số lượng dạng chuỗi số hợp lệ.
console.log(buildReceiptLine("  Bàn phím cơ  ", "1250000", "1"));
// Expected: "Bàn phím cơ x1: 1.250.000 đ + VAT 100.000 đ = 1.350.000 đ"

// Kiểm tra số lượng bằng 0.
console.log(buildReceiptLine("Chuột gaming", 450000, 0));
// Expected: "Dữ liệu dòng hàng không hợp lệ"

// Kiểm tra đơn giá âm.
console.log(buildReceiptLine("Chuột không dây", -50000, 2));
// Expected: "Dữ liệu dòng hàng không hợp lệ"

// Kiểm tra tên hàng rỗng.
console.log(buildReceiptLine("", 450000, 2));
// Expected: "Dữ liệu dòng hàng không hợp lệ"

// Kiểm tra tên hàng chỉ chứa khoảng trắng.
console.log(buildReceiptLine("   ", 450000, 2));
// Expected: "Dữ liệu dòng hàng không hợp lệ"

// Kiểm tra số lượng thập phân.
console.log(buildReceiptLine("Màn hình Dell", 3500000, 1.5));
// Expected: "Dữ liệu dòng hàng không hợp lệ"
