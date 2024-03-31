class SanPham {
  constructor(loai, ten, gia, hinh) {
    this.maSp = uuidv4();
    this.loaiSp = loai;
    this.tenSp = ten;
    this.gia = gia;
    this.hinh = hinh;
  }
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const SAN_PHAM_KEY = "danhSachSanPham";

const dsLoai = ["Điện thoại", "Máy tính bảng", "Laptop"];

class CuaHang {
  constructor(ds) {
    this.sanPhams = ds;
  }

  DocDuLieu() {
    let data = localStorage.getItem(SAN_PHAM_KEY);
    if (data === null) {
      this.sanPhams = [];
      return [];
    } else {
      let objs = JSON.parse(data);
      this.sanPhams = objs;
      return objs;
    }
  }

  GhiDuLieu() {
    localStorage.setItem(SAN_PHAM_KEY, JSON.stringify(this.sanPhams));
  }

  TimTheoMaSP(maCanTim) {
    for (let idx in this.sanPhams) {
      if (this.sanPhams[idx].maSp === maCanTim) {
        return this.sanPhams[idx];
      }
    }

    return null;
  }

  TimTheoTenSP(tenCanTim) {
    for (let idx in this.sanPhams) {
      if (this.sanPhams[idx].tenSp.indexOf(tenCanTim) > -1) {
        return this.sanPhams[idx];
      }
    }

    return null;
  }

  ThemSanPham(sanPhamThem) {
    this.DocDuLieu();

    //check xem sản phẩm đã có trước đó hay chưa, vd dựa vào maSp
    let existedProd = this.TimTheoMaSP(sanPhamThem.maSp);
    if (existedProd === null) {
      this.sanPhams.push(sanPhamThem);
      this.GhiDuLieu();
    }
  }

  CapNhatSanPham(sanPhamCanSua) {
    this.DocDuLieu();

    //check xem sản phẩm đã có trước đó hay chưa, vd dựa vào maSp
    let existedProd = this.TimTheoMaSP(sanPhamCanSua.maSp);
    if (existedProd !== null) {
      //update từng field
      existedProd.tenSp = sanPhamCanSua.tenSp;

      this.GhiDuLieu();
    }
  }

  XoaSanPham(maSP) {
    this.DocDuLieu();

    //check xem sản phẩm đã có trước đó hay chưa, vd dựa vào maSp
    let existedProd = this.TimTheoMaSP(maSP);
    if (existedProd !== null) {
      this.sanPhams.remove(existedProd);
      this.GhiDuLieu();
    }
  }
}

let danhSachSanPham = new CuaHang([]);

//Đăng ký sự kiện
function luuThemMoi() {
  //check validation first
  let loai = document.getElementById("loaisp").value;
  let tensp = document.getElementById("tenSanPham").value;
  let gia = parseInt(document.getElementById("donGia").value);
  let hinh = document.getElementById("linkHinh").value;
  let sp = new SanPham(loai, tensp, gia, hinh);
  danhSachSanPham.ThemSanPham(sp);
}
