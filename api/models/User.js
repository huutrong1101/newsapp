const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: "",
  },
  public_id: {
    type: String,
    required: false,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

// UserSchema là tên bất kỳ không phân biệt chữ hoa thường, "User" sẽ được lưu vào database dưới dạng 1 bảng
// và chử hoa biến thành thường hết nó sẽ tự động thêm số nhiều cho tên đó tức là thêm s sau tên User -> users