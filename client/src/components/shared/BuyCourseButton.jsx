import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

function BuyCourseButton({ courseId }) {
  const [createCheckoutSession, { data, isLoading, isError, error }] =
    useCreateCheckoutSessionMutation();

  console.log("Checkout Session Data:", data);

  const purchaseCourseHandler = async () => {
    try {
      await createCheckoutSession({ courseId }).unwrap();
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  };

  //
  useEffect(() => {
    if (data && data.url) {
      toast.success("Redirecting to payment gateway...");
      window.location.href = data.url;
    } else {
      toast.error("Failed to create checkout session.");
    }
    if (isError) {
      toast.error(
        error?.data?.message ||
          "An error occurred while creating checkout session."
      );
    }
  }, [data, isError, error]);
  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={purchaseCourseHandler}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Purchase Course"
        )}
      </Button>
    </div>
  );
}

export default BuyCourseButton;
