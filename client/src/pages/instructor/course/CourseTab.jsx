import RichTextEditor from "@/components/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
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
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";

function CourseTab() {
  const [input, setInput] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const navigate = useNavigate();
  const { courseId } = useParams();

  const { data, isLoading, refetch } = useGetCourseByIdQuery(courseId);

  const [editCourse, { isLoading: updating }] = useEditCourseMutation();

  const [publishCourse] = usePublishCourseMutation();

  useEffect(() => {
    if (data?.course) {
      const c = data.course;
      setInput({
        courseTitle: c.courseTitle || "",
        subTitle: c.subTitle || "",
        description: c.description || "",
        category: c.category || "",
        courseLevel: c.courseLevel || "",
        coursePrice: c.coursePrice || "",
        courseThumbnail: "",
        oldThumbnail: c.courseThumbnail || "",
      });
    }
  }, [data]);

  if (isLoading || !input) return <LoadingSpinner />;

  const updateCourseHandler = async () => {
    const formData = new FormData();

    Object.keys(input).forEach((key) => {
      if (key !== "oldThumbnail" && input[key]) {
        formData.append(key, input[key]);
      }
    });

    await editCourse({ formData, courseId });
    toast.success("Course updated");
  };

  const publishHandler = async () => {
    const action = data?.course?.isPublished ? "false" : "true";
    await publishCourse({ courseId, query: action });
    refetch();
    toast.success("Publish status updated");
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInput({ ...input, courseThumbnail: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreviewThumbnail(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 🔥 LEFT: FORM */}
      <div className="lg:col-span-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Edit Course</CardTitle>
            <CardDescription>
              Update your course information and settings
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* TITLE */}
            <div className="space-y-2">
              <Label>Course Title</Label>
              <Input
                value={input.courseTitle}
                onChange={(e) =>
                  setInput({ ...input, courseTitle: e.target.value })
                }
              />
            </div>

            {/* SUBTITLE */}
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={input.subTitle}
                onChange={(e) =>
                  setInput({ ...input, subTitle: e.target.value })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>

            {/* GRID FIELDS */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* CATEGORY */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={input.category}
                  onValueChange={(v) => setInput({ ...input, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "React",
                      "Next JS",
                      "Fullstack",
                      "Python",
                      "Database",
                    ].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* LEVEL */}
              <div className="space-y-2">
                <Label>Level</Label>
                <Select
                  value={input.courseLevel}
                  onValueChange={(v) => setInput({ ...input, courseLevel: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Beginner", "Intermediate", "Advanced"].map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PRICE */}
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={input.coursePrice}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      coursePrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/teacher/courses")}
              >
                Cancel
              </Button>

              <Button onClick={updateCourseHandler} disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🔥 RIGHT: SIDEBAR */}
      <div className="space-y-6">
        {/* THUMBNAIL */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Thumbnail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="file" onChange={selectThumbnail} />

            <img
              src={previewThumbnail || input.oldThumbnail}
              className="rounded-xl w-full object-cover"
            />
          </CardContent>
        </Card>

        {/* PUBLISH */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 space-y-3">
            <Button
              onClick={publishHandler}
              className="w-full"
              variant="outline"
            >
              {data?.course?.isPublished
                ? "Unpublish Course"
                : "Publish Course"}
            </Button>

            <Button variant="destructive" className="w-full">
              Delete Course
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CourseTab;
