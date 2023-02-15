import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import LazyLoadImage from "./LazyLoadImage";
import Loading from "./Loading";
import Tabs from "./Tabs";
import Advertisement from "./Advertisement";
import TagCardAlt from "./TagCardAlt";
import { SvgNews } from "./svgs/SvgNews";
import { SvgDelete } from "./svgs/SvgDelete";
import { SvgEdit } from "./svgs/SvgEdit";
import { SvgTrash } from "./svgs/SvgTrash";
import { SvgExit } from "./svgs/SvgExit";
import Spinner from "./Spinner";
import { publicRequest, userRequest } from "../requestMethods";
import { FileUploader } from "react-drag-drop-files";
import cx from "classnames";
import { average } from "color.js";
import { BlurhashCanvas } from "react-blurhash";
import { dayjsFormat } from "../utils/dayjsFormat";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useTheme } from "next-themes";
import RelatedPages from "./RelatedPages";

const SinglePost = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const { quill, quillRef } = useQuill();
  const [publicId, setPublicId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range?.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    setIsLoading(true);
    document.body.classList.add("noscroll");
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", "folder_posts");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dxkosumln/image/upload",
      body
    );
    insertToEditor(uploadRes.data.secure_url);
    setPublicId((prev) => prev.concat(uploadRes.data.public_id));
    setIsLoading(false);
    document.body.classList.remove("noscroll");
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };
  // end Insert Image(selected by user) to quill

  useEffect(() => {
    // for responsive iframe video https://github.com/quilljs/quill/issues/1707
    var videos = document.querySelectorAll(".ql-editor .ql-video");
    for (let i = 0; i < videos.length; i++) {
      var embedContainer = document.createElement("div");
      embedContainer.setAttribute("class", "embed-container");
      var parent = videos[i].parentNode;
      parent.insertBefore(embedContainer, videos[i]);
      embedContainer.appendChild(videos[i]);
    }

    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);

      quill.clipboard.dangerouslyPasteHTML(desc);
      quill.on("text-change", (delta, oldDelta, source) => {
        // console.log(quillRef.current.firstChild.innerHTML);
        setDesc(quillRef.current.firstChild?.innerHTML);
      });
    }
  }, [quill]);

  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const { query, isReady } = useRouter();
  const path = query.slug;
  const [post, setPost] = useState(false);
  const [title, setTitle] = useState("");
  const [hasChangeTitle, sethasChangeTitle] = useState(false);
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [thumbs, setThumbs] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosDelete, setPhotosDelete] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  // cats lấy từ mongodb cho select option
  const [cats, setCats] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [reRender, setReRender] = useState(false);
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "jfif"];
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // blob images selected
  const handleFiles = (e) => {
    setFiles([...files, ...e]);
    const blob = [...e].map((file) => URL.createObjectURL(file));
    setThumbs([...thumbs, ...blob]);
  };

  // delete selected image
  const handleDeleteSelectedImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setThumbs(thumbs.filter((_, i) => i !== index));
    URL.revokeObjectURL(thumbs[index]);
  };

  // delete photos
  const handleDeletePhotos = (img) => {
    setPhotos(photos.filter((photo) => photo !== img));
    // setPhotosDelete((prev) => prev.concat(photos.filter((photo) => photo === img)))
    setPhotosDelete([
      ...photosDelete,
      ...photos.filter((photo) => photo === img),
    ]);
  };

  useEffect(() => {
    if (isReady) {
      const getPost = async () => {
        setLoading(true);
        setIsShowMoreBtn(true);
        const res = await publicRequest.get(`/posts/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setPhotos(res.data.photos);
        setDesc(res.data.desc);
        setPublicId(res.data.public_id || []);
        setCategories(res.data.categories);
        setLoading(false);
      };
      getPost();
    }
  }, [isReady, path]);

  useEffect(() => {
    const getCats = async () => {
      const res = await publicRequest.get("/categories/");
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleDelete = async () => {
    try {
      await userRequest.delete(`/posts/${post._id}`, {
        data: { username: currentUser.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = (index) => {
    setOpen(true);
    setSlideNumber(index);
    document.body.classList.add("noscroll");
  };

  const handleUpdate = async () => {
    setIsUploading(true);
    const newPost = {
      username: currentUser.username,
      title,
      desc,
      photos,
      categories,
      photosDelete,
      public_id: publicId,
    };

    if (files) {
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.round(
            ((loaded / 1000) * 100) / (total / 1000)
          );
          setProgress(percentage);
        },
      };
      try {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "folder_posts");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dxkosumln/image/upload",
              data,
              options
            );
            const { secure_url, public_id } = uploadRes.data;
            const color = await average(secure_url, { format: "hex" }).then(
              (color) => {
                return color;
              }
            );
            return {
              src: secure_url,
              public_id: public_id,
              color: color,
            };
          })
        );

        try {
          newPost.photos = [...photos, ...list];
          await userRequest.put(`/posts/${post._id}`, newPost, options);
          setThumbs([]);
          setFiles([]);
          window.scrollTo({ top: 0 });
          setUpdateMode(false);
          // setReRender(!reRender);
          setIsUploading(false);
          setProgress(0);
          thumbs.map((thumb) => URL.revokeObjectURL(thumb));
          hasChangeTitle ? window.location.replace("/") : router.reload();
        } catch (err) {
          setError(true);
          setIsUploading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <div className="singlePost">
          <div className="wrapper">
            <div className="singlePost__heading">
              {updateMode ? (
                <>
                  <select
                    className="bg-transparent dark:text-slate-200"
                    onChange={(e) => {
                      setCategories([e.target.value]);
                      setCategory([e.target.value]);
                    }}
                  >
                    <option style={{ display: "none" }}>Chọn thể loại</option>
                    {cats.map((item) => (
                      <option key={item._id} value={item.cat}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {category[0] === "economy" && (
                    <select
                      className="bg-transparent dark:text-slate-200"
                      onChange={(e) =>
                        setCategories([...category, e.target.value])
                      }
                    >
                      <option style={{ display: "none" }}>Danh mục phụ</option>
                      <option value="innovation">Sự đổi mới</option>
                      <option value="tourism">Du lịch</option>
                    </select>
                  )}

                  {category[0] === "society" && (
                    <select
                      className="bg-transparent dark:text-slate-200"
                      onChange={(e) =>
                        setCategories([...category, e.target.value])
                      }
                    >
                      <option style={{ display: "none" }}>Danh mục phụ</option>
                      <option value="civil-protection">Bảo Vệ công dân</option>
                      <option value="education">Giáo dục</option>
                      <option value="housing">Nhà ở</option>
                      <option value="urban-planning">Quy hoạch đô thị</option>
                    </select>
                  )}
                </>
              ) : (
                <TagCardAlt post={post} />
              )}
              {updateMode ? (
                <input
                  className="singlePost__mainTitle update bg-transparent dark:border-b dark:border-slate-600 dark:text-slate-200"
                  type="text"
                  value={title}
                  autoFocus
                  onChange={(e) => {
                    setTitle(e.target.value);
                    sethasChangeTitle(true);
                  }}
                />
              ) : (
                <h1 className="singlePost__mainTitle dark:text-slate-200">
                  {title}
                </h1>
              )}
              <h3>
                Tác giả:{" "}
                <span
                  style={{
                    fontSize: "22px",
                    color: "rgb(59 130 246 / var(--tw-text-opacity)",
                  }}
                >
                  {post.username}
                </span>
              </h3>
              <ul className="singlePost__info dark:text-slate-200">
                <li className="singlePost__date">
                  {dayjsFormat(post.createdAt)}
                </li>
                <li className="singlePost__author before:bg-blue-900 dark:before:bg-slate-200">
                  <b>Logo.</b>
                </li>
                <li className="singlePost__type before:bg-blue-900 dark:before:bg-slate-200">
                  <SvgNews
                    color={currentTheme === "dark" ? "#ffffff" : "#1e3a8a"}
                  />
                  <b>Tin tức</b>
                </li>
              </ul>
            </div>
            <div className="singlePost__container">
              <div className="singlePost__left">
                {/* Update Mode */}
                {updateMode && (
                  <>
                    <div className="singlePost__thumbs">
                      {thumbs &&
                        thumbs.map((thumb, index) => (
                          <figure key={index} className="singlePost__thumb">
                            <Image
                              src={thumb}
                              width={400}
                              height={400}
                              alt=""
                            />
                            <span
                              className="singlePost__iconDelete"
                              onClick={() => handleDeleteSelectedImage(index)}
                            >
                              <SvgDelete color="#ffffff" />
                            </span>
                          </figure>
                        ))}
                    </div>
                    <div className="mb-6 px-[15px] xs:px-0">
                      <FileUploader
                        id="fileInput"
                        classes="drop_area"
                        type="file"
                        label="Tải lên hoặc thả tệp ngay tại đây"
                        name="file"
                        multiple
                        hoverTitle="Thả ở đây"
                        types={fileTypes}
                        handleChange={(e) => handleFiles(e)}
                      />
                    </div>
                    <div
                      className={cx(
                        "singlePost__imgWrapper relative px-[15px] after:w-[calc(100%-30px)] after:translate-x-[15px] xs:px-0 xs:after:w-full xs:after:translate-x-0",
                        {
                          showBtn: isShowMoreBtn && photos.length > 3,
                          showMoreBtnClicked: !isShowMoreBtn,
                        }
                      )}
                    >
                      {photos.map((img, index) => {
                        return (
                          <figure
                            className="singlePost__bg updateMode"
                            style={{ backgroundColor: `${img.color}` }}
                            key={img._id || index}
                          >
                            <LazyLoadImage
                              photo={img.src}
                              blurhash={img.blurhash}
                              alt={post.title}
                            />
                            <span
                              className="singlePost__iconDelete"
                              style={{ width: "40px", height: "40px" }}
                              onClick={() => handleDeletePhotos(img)}
                            >
                              <SvgDelete color="#cb3940" />
                            </span>
                          </figure>
                        );
                      })}
                      <div
                        className="btnContainer showMoreBtn"
                        onClick={() => setIsShowMoreBtn(false)}
                      >
                        <div className="cta cta02 m-01">
                          <span>Xem thêm</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* end Update Mode */}
                {!updateMode && (
                  <div
                    className={cx("singlePost__imgWrapper relative", {
                      showBtn: isShowMoreBtn && photos.length > 3,
                      showMoreBtnClicked: !isShowMoreBtn,
                    })}
                  >
                    {photos.map((img, index) => {
                      return (
                        <figure
                          className="singlePost__bg"
                          style={{ backgroundColor: `${img.color}` }}
                          key={img._id || index}
                          onClick={() => {
                            handleOpen(index);
                          }}
                        >
                          <LazyLoadImage
                            photo={img.src}
                            blurhash={img.blurhash}
                            alt={post.title}
                          />
                        </figure>
                      );
                    })}
                    <div
                      className="btnContainer showMoreBtn"
                      onClick={() => setIsShowMoreBtn(false)}
                    >
                      <div className="cta cta02 m-01">
                        <span>Xem thêm</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="singlePost__text ql-snow">
                  {isLoading && (
                    <div className="overplay">
                      <span>Đang tải lên hình ảnh...</span>
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: updateMode ? "block" : "none",
                    }}
                  >
                    <div ref={quillRef} />
                  </div>
                  {!updateMode && (
                    <p
                      className="singlePost__description ql-editor !px-0 dark:text-slate-200"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    ></p>
                  )}

                  {isUploading && (
                    <div className="singlePost__progress">
                      <label htmlFor="file">Đang tải lên hình ảnh: </label>
                      <progress id="file" value={progress} max="100"></progress>
                      <span> {progress}% </span>
                    </div>
                  )}
                  {updateMode && (
                    <button
                      className={cx("singlePost__updateBtn", {
                        disabled: isUploading,
                      })}
                      onClick={handleUpdate}
                    >
                      {isUploading ? <Spinner /> : "Cập nhật"}
                    </button>
                  )}

                  {updateMode ? (
                    <div className="singlePost__actions noSpacing">
                      <div className="singlePost__edit">
                        <i
                          className="singlePost__icon cancle"
                          onClick={() => setUpdateMode(false)}
                        >
                          <p>Thoát</p>
                          <SvgExit color="#ffffff" />
                        </i>
                      </div>
                    </div>
                  ) : (
                    <div className="singlePost__actions">
                      {post.username === currentUser?.username && (
                        <div className="singlePost__edit">
                          <i
                            className="singlePost__icon edit"
                            onClick={() => setUpdateMode(true)}
                          >
                            <p>Chỉnh sửa</p>
                            <SvgEdit color="#ffffff" />
                          </i>
                          <i
                            className="singlePost__icon delete"
                            onClick={handleDelete}
                          >
                            <p>Xoá</p>
                            <SvgTrash color="#ffffff" />
                          </i>
                        </div>
                      )}
                    </div>
                  )}

                  {error && (
                    <div style={{ color: "red" }}>
                      Cập nhật không thành công!
                    </div>
                  )}
                </div>
              </div>
              <div className="singlePost__right sticky top-36 h-full lg:pb-64">
                <Tabs />
                <Advertisement
                  photo="https://res.cloudinary.com/dxkosumln/image/upload/v1675996204/profiles/kmums74agdt1t4uzxo3w.jpg"
                  blurhash="LCGIWP~WS%JA_4IoX9Rj0K-=kDoM"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          className="modal z-50"
          onClick={() => {
            setOpen(false);
            setLoaded(false);
            document.body.classList.remove("noscroll");
          }}
        >
          <div
            className="modal__container"
            style={{ backgroundColor: `${photos[slideNumber].color}` }}
          >
            <span className="modal__close">
              <SvgDelete color="#ffffff" />
            </span>
            <BlurhashCanvas
              className="absolute top-0 left-0 h-full w-full object-cover"
              hash={photos[slideNumber].blurhash}
              width={32}
              height={32}
            />
            <figure
              className={
                loaded ? "modal__image show relative" : "modal__image relative"
              }
              onClick={() => {
                setOpen(false);
                setLoaded(false);
                document.body.classList.remove("noscroll");
              }}
            >
              <Image
                src={photos[slideNumber].src}
                alt={`${post.title}`}
                onLoad={() => setLoaded(true)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              />
            </figure>
          </div>
        </div>
      )}
      <RelatedPages postData={post} />
    </>
  );
};

export default SinglePost;
