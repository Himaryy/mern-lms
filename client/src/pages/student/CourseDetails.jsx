import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, calculateRating } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, allCourses]);

  return courseData ? (
    <>
      <div className="flex md:flex flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-10 pt-5 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height inset-0 z-0 bg-gradient-to-b from-cyan-100/70"></div>
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-[56px] md:leading-[64px] text-[28px] leading-[44px] font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          />

          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="Star"
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <div>•</div>
            <p className="text-blue-600">
              {courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length >= 1 ? "Reviews" : "No Review"}
            </p>

            <div>•</div>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}
            </p>
          </div>
          <p className="text-sm">
            Course by <span className="text-blue-600 underline">Himary</span>
          </p>
        </div>

        <div></div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
