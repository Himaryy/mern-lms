import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import uniqid from "uniqid";
// 6:3923
const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleAddChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Title:");

      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };

        setChapters([...chapters, newChapter]);
        // console.log("Current chapters:", chapters);
      }
    } else if (action === "remove") {
      // console.log("Removing chapterId:", chapterId);

      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter(
                (_, index) => index !== lectureIndex
              ),
            };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 h-screen overflow-y-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 pt-8 pb-0">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex md:flex-row flex-col gap-5 w-full text-gray-500 md:p-8 pb-0"
        >
          <div className="flex flex-col flex-1 min-w-[250px] gap-4">
            <div className="flex flex-col gap-1">
              <p>Course Title</p>
              <input
                type="text"
                onChange={(e) => setCourseTitle(e.target.value)}
                value={courseTitle}
                placeholder="Type Here"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Course Description</p>
              <div ref={editorRef}></div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex flex-col gap-1">
                <p>Course Price</p>
                <input
                  type="number"
                  onChange={(e) => setCoursePrice(e.target.value)}
                  value={coursePrice}
                  placeholder="0"
                  className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Discount</p>
                <input
                  type="number"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  placeholder="0"
                  min={0}
                  max={100}
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {chapters.map((chapter, chapterIndex) => (
                <div className="bg-white border rounded-lg" key={chapterIndex}>
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={assets.down_arrow_icon}
                        alt="Down Icon"
                        width={14}
                        className={`mr-2 cursor-pointer transition-all ${
                          chapter.collapsed && "-rotate-90"
                        }`}
                        onClick={() =>
                          handleAddChapter("toggle", chapter.chapterId)
                        }
                      />
                      <span className="font-semibold">
                        {chapterIndex + 1}. {chapter.chapterTitle}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {chapter.chapterContent.length} Lectures
                    </span>
                    <img
                      src={assets.cross_icon}
                      alt="Cross Icon"
                      className="cursor-pointer"
                      onClick={() =>
                        handleAddChapter("remove", chapter.chapterId)
                      }
                    />
                  </div>

                  {!chapter.collapsed && (
                    <div className="p-4">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <div
                          key={lectureIndex}
                          className="flex justify-between items-center mb-2"
                        >
                          <span>
                            {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                            {lecture.lectureDuration} mins -{" "}
                            <a
                              className="underline text-blue-500"
                              href={lecture.lectureUrl}
                            >
                              Link
                            </a>{" "}
                            - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                          </span>
                          <img
                            src={assets.cross_icon}
                            alt="Cross Icon"
                            className="cursor-pointer"
                            onClick={() =>
                              handleLecture(
                                "remove",
                                chapter.chapterId,
                                lectureIndex
                              )
                            }
                          />
                        </div>
                      ))}

                      <div
                        className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                        onClick={() => handleLecture("add", chapter.chapterId)}
                      >
                        Add Lecture
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ✅ ADD CHAPTER BUTTON */}
            <div
              className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
              onClick={() => handleAddChapter("add")}
            >
              + Add Chapter
            </div>

            {/* ✅ POPUP ADD LECTURE */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-400/70">
                <div className="bg-white text-gray-700 rounded p-4 relative w-full max-w-80">
                  <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

                  <div className="mb-2">
                    <p>Lecture Title</p>
                    <input
                      type="text"
                      className="mt-1 block w-full border rounded py-1 px-2"
                      value={lectureDetails.lectureTitle}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          lectureTitle: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-2">
                    <p>Lecture Duration (minutes)</p>
                    <input
                      type="number"
                      className="mt-1 block w-full border rounded py-1 px-2"
                      value={lectureDetails.lectureDuration}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          lectureDuration: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-2">
                    <p>Lecture Url</p>
                    <input
                      type="text"
                      className="mt-1 block w-full border rounded py-1 px-2"
                      value={lectureDetails.lectureUrl}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          lectureUrl: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-2 my-4">
                    <p>Is Preview Free?</p>
                    <input
                      type="checkbox"
                      className="mt-1 scale-125"
                      checked={lectureDetails.isPreviewFree}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          isPreviewFree: e.target.checked,
                        })
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full bg-blue-400 text-white px-4 py-2 rounded"
                    onClick={addLecture}
                  >
                    Add
                  </button>
                  <img
                    src={assets.cross_icon}
                    alt="Close"
                    className="absolute top-4 right-4 w-4 cursor-pointer"
                    onClick={() => setShowPopup(false)}
                  />
                </div>
              </div>
            )}

            {/* ✅ ADD COURSE BUTTON */}
            <button
              type="submit"
              className="bg-black text-white w-max py-2.5 px-8 rounded"
            >
              Add Course
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <p className="mb-4 text-gray-700">Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Thumbnail Preview"
                  className="max-h-40 object-contain rounded"
                />
              ) : (
                <div className="w-96 h-48 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                  <span className="text-gray-400">
                    <img
                      src="https://placehold.co/600x400?text=No+Image+Found"
                      alt=""
                    />
                  </span>
                </div>
              )}
              <img
                src={assets.file_upload_icon}
                alt="Upload Icon"
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
