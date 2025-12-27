import RichTextEditor from "@/components/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CourseTab() {
  // FIX 1: Start with null so we wait for API data
  const [input, setInput] = useState(null);

  const navigate = useNavigate();
  const { courseId } = useParams();

  const {
    data: courseByData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);
  // console.log("courseByData:", courseByData);
  const [publishCourse, {}] = usePublishCourseMutation();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  // LOAD API DATA INTO INPUT
  useEffect(() => {
    if (courseByData?.course) {
      const course = courseByData.course;

      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: "",
        oldThumbnail: course.courseThumbnail || "",
      });
    }
  }, [courseByData]);

  // PUBLISH / UNPUBLISH COURSE
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({
        courseId,
        query: action,
      }).unwrap();
      toast.success(
        response.message ||
          `Course ${action ? "published" : "unpublished"} successfully`
      );
      refetch();
      // if (response.data) {
      //   refetch();
      //   toast.success(response.data.message || "Publish status updated");
      // }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update publish status");
    }
  };

  // SUCCESS / ERROR HANDLING
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successfully");
      navigate("/teacher/courses");
    }
    if (error) {
      toast.error(error.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, data, navigate]);

  // FIX 2: Do not load UI until input filled
  if (!input) return <p>Loading...</p>;

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // FILE SELECT
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // SUBMIT
  const updateCourseHandler = async () => {
    const formData = new FormData();

    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData, courseId });
  };

  const categories = [
    "React",
    "Next JS",
    "Data Science",
    "Frontend Development",
    "Fullstack Development",
    "MERN Stack Development",
    "Javascript",
    "Python",
    "Docker",
    "MongoDB",
    "HTML",
    "Others",
  ];

  const courseLevels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

  if (courseByIdLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>
              Make changes to your course here. Click save when you're done.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={courseByData?.course?.lectures.length === 0}
              variant="outline"
              onClick={() =>
                publishStatusHandler(
                  courseByData?.course.isPublished ? "false" : "true"
                )
              }
            >
              {courseByData?.course.isPublished ? "Unpublish " : "Publish "}
            </Button>
            <Button>Remove Course</Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mt-5">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Fullstack Developer"
              />
            </div>

            {/* Subtitle */}
            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Become a fullstack developer from scratch"
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>

            {/* Category + Level + Price */}
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select value={input.category} onValueChange={selectCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Course Level</Label>
                <Select
                  value={input.courseLevel}
                  onValueChange={selectCourseLevel}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Price (TK)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="Ex. 5000"
                  className="w-fit"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <Label>Course Thumbnail</Label>
              <Input type="file" onChange={selectThumbnail} accept="image/*" />

              {/* Preview selected */}
              {previewThumbnail ? (
                <img src={previewThumbnail} className="w-64 my-2" />
              ) : (
                input.oldThumbnail && (
                  <img src={input.oldThumbnail} className="w-64 my-2" />
                )
              )}
            </div>

            <div>
              <Button
                onClick={() => navigate("/teacher/courses")}
                variant="outline"
              >
                Cancel
              </Button>

              <Button disabled={isLoading} onClick={updateCourseHandler}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseTab;
