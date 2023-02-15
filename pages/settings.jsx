import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import ImgDefault from "../assets/images/img_default.jpg";
import MostRead from "../components/MostRead";
import Spinner from "../components/Spinner";
import cx from "classnames";
import { userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/userSlice";
import { useRouter } from "next/router";

const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  if (!currentUser) {
    router.push("/login");
  }
  // console.log(currentUser);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    setIsUploading(true);
    e.preventDefault();
    dispatch(updateStart());
    const updatedUser = {
      userId: currentUser._id,
      username,
      email,
    };

    if (password) {
      updatedUser.password = password;
    }

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "folder_profiles");
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dxkosumln/image/upload",
          data
        );
        // console.log(uploadRes.data);
        const { secure_url, public_id } = uploadRes.data;
        updatedUser.profilePic = secure_url;
        updatedUser.public_id = public_id;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await userRequest.put(
        "/users/" + currentUser._id,
        updatedUser
      );
      setSuccess(true);
      setIsUploading(false);
      dispatch(updateSuccess(res.data));
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } catch (err) {
      dispatch(updateFailure);
    }
  };

  const handleDelete = async () => {
    try {
      await userRequest.delete("/users/" + currentUser._id, {
        data: { userId: currentUser._id },
      });
      dispatch(logout());
      router.push("/login");
    } catch (err) {}
  };

  return (
    <>
      <Head>
        <title>Cài đặt| Nguyễn Hữu Trọng</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="settings">
        <div className="wrapper">
          <div className="settings__heading">
            <span className="settings__mainTitle dark:text-slate-200">
              Cập Nhật Tài Khoản Của Bạn
            </span>
            <span
              className="settings__btnDelete"
              title="Không thể khôi phục khi nhấn"
              onClick={handleDelete}
            >
              Xoá tài khoản
            </span>
          </div>
          <div className="settings__container">
            <div className="settings__left">
              <form className="settings__form" onSubmit={handleSubmit}>
                <p className="dark:text-slate-200">Ảnh đại diện</p>
                <div className="settings__profile">
                  <label htmlFor="fileInput" className="settings__profilePic">
                    <Image
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : currentUser?.profilePic
                          ? currentUser?.profilePic
                          : ImgDefault
                      }
                      width={150}
                      height={150}
                      alt=""
                    />
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M12.129 9.18701C11.0023 9.18701 10.0889 10.1004 10.0889 11.2271C10.0889 12.3538 11.0022 13.2672 12.129 13.2672C13.2557 13.2672 14.1691 12.3539 14.1691 11.2271C14.1691 10.1004 13.2557 9.18701 12.129 9.18701ZM12.129 12.2957C11.5388 12.2957 11.0604 11.8173 11.0604 11.2271C11.0604 10.6369 11.5388 10.1584 12.129 10.1584C12.7192 10.1584 13.1976 10.6369 13.1976 11.2271C13.1976 11.8173 12.7192 12.2957 12.129 12.2957Z"
                        fill="white"
                      />{" "}
                      <path
                        d="M20.2644 4.52389L7.00379 3.01814C6.48913 2.94497 5.96769 3.09522 5.57088 3.43104C5.17412 3.73869 4.91979 4.19472 4.86656 4.69394L4.62371 6.68548H3.87077C2.80213 6.68548 2.00066 7.63265 2.00066 8.70129V18.6346C1.97374 19.6537 2.77801 20.5016 3.79709 20.5285C3.82163 20.5292 3.84622 20.5293 3.87077 20.529H17.2043C18.2729 20.529 19.2444 19.7033 19.2444 18.6346V18.246C19.5757 18.182 19.89 18.0497 20.1673 17.8575C20.5608 17.5261 20.8127 17.057 20.8716 16.546L21.9888 6.68548C22.1027 5.61438 21.3341 4.65085 20.2644 4.52389ZM18.2729 18.6346C18.2729 19.1689 17.7386 19.5575 17.2043 19.5575H3.87077C3.3881 19.5717 2.98534 19.1919 2.97116 18.7092C2.97042 18.6844 2.97074 18.6595 2.97214 18.6346V16.8374L6.73663 14.0687C7.18885 13.7215 7.82581 13.7524 8.24242 14.1415L10.8897 16.4731C11.2917 16.8106 11.7978 16.9993 12.3227 17.0074C12.733 17.0124 13.1367 16.9031 13.4884 16.6917L18.2729 13.923V18.6346H18.2729ZM18.2729 12.7815L12.9783 15.8659C12.5237 16.1353 11.9482 16.0865 11.5454 15.7445L8.87385 13.3886C8.10817 12.7307 6.98905 12.6904 6.178 13.2915L2.97214 15.623V8.70129C2.97214 8.16697 3.33645 7.65696 3.87077 7.65696H17.2043C17.7751 7.68062 18.2361 8.13117 18.2729 8.70129V12.7815ZM21.0183 6.55434C21.0179 6.55755 21.0177 6.5608 21.0173 6.56401L19.8758 16.4245C19.8778 16.6802 19.7612 16.9223 19.5601 17.0802C19.4629 17.1774 19.2443 17.226 19.2443 17.2746V8.70129C19.206 7.59486 18.311 6.71054 17.2042 6.68548H5.59515L5.81373 4.7911C5.86114 4.54579 5.9894 4.32349 6.17804 4.15962C6.39105 4.01235 6.64858 3.94369 6.90668 3.96531L20.1431 5.49537C20.6771 5.54609 21.069 6.02021 21.0183 6.55434Z"
                        fill="#1C60BF"
                      />{" "}
                    </svg>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
                <label
                  htmlFor=""
                  className="dark:border-b-slate-600 dark:text-slate-200"
                >
                  Tên người dùng
                </label>
                <input
                  type="text"
                  className="bg-transparent dark:border-b-slate-600 dark:text-slate-200"
                  placeholder={currentUser?.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="bg-transparent dark:border-b-slate-600 dark:text-slate-200"
                  placeholder={currentUser?.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="">Mật khẩu</label>
                <input
                  type="password"
                  className="bg-transparent dark:border-b-slate-600 dark:text-slate-200"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={cx("settings__submit", { disabled: isUploading })}
                  type="submit"
                >
                  {isUploading ? <Spinner /> : "Cập nhật"}
                </button>
                {success && (
                  <span style={{ color: "green", textAlign: "center" }}>
                    Hồ sơ đã được cập nhật!
                  </span>
                )}
              </form>
            </div>
            <div className="settings__right">
              <MostRead />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
