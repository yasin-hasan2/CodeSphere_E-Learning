import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Lecture({ lecture, index, courseId }) {
  // console.log("lecture prop:", courseId);

  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    // window.location.href = `/teacher/courses/${courseId}/lecture/${lecture._id}`;
    navigate(`/teacher/courses/${courseId}/lecture/${lecture._id}`);
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
        <h1 className="font-bold text-gray-800 dark:text-gray-100">
          Lecture - {index + 1}: {lecture.lectureTitle}
        </h1>
        <Edit
          onClick={goToUpdateLecture}
          size={20}
          className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        />
      </div>
    </div>
  );
}

// 9:27

export default Lecture;
