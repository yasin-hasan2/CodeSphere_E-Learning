import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Camera } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

function Profile() {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, refetch } = useLoadUserQuery();

  const [updateUser, { isLoading: updating, isSuccess, error }] =
    useUpdateUserMutation();

  const user = data?.user;

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated");
      refetch();
    }
    if (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  }, [isSuccess, error]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 🔥 PROFILE HEADER */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-10 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-white shadow-lg">
              <AvatarImage src={user?.photoUrl} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {/* Camera icon */}
            <label className="absolute bottom-2 right-2 bg-white text-black p-2 rounded-full cursor-pointer shadow">
              <Camera size={16} />
              <input type="file" onChange={handleFile} hidden />
            </label>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{user?.name}</h1>
            <p className="text-sm opacity-90">{user?.email}</p>

            <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
              {user?.role?.toUpperCase()}
            </span>

            {/* Edit button */}
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Edit Profile
                  </Button>
                </DialogTrigger>

                <DialogContent className="rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />

                    <Input type="file" accept="image/*" onChange={handleFile} />
                  </div>

                  <DialogFooter>
                    <Button onClick={handleUpdate} disabled={updating}>
                      {updating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 ENROLLED COURSES */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Learning Courses</h2>
          <span className="text-sm text-gray-500">
            {user?.enrolledCourses?.length || 0} courses
          </span>
        </div>

        {user?.enrolledCourses?.length === 0 ? (
          <div className="text-center py-10 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500">
              You haven’t enrolled in any course yet.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user.enrolledCourses.map((course) => (
              <div className="transform hover:-translate-y-1 transition duration-300">
                <Course key={course._id} course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
