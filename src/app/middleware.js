import multer from "multer";

export const config = {
  matcher: "/api/uploadImages",
};

const middleware = () => {
  console.log("middleware");
};

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// upload.single("images");
