import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, Briefcase } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Choose Your Role
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-6 w-full md:px-40">
        <Card className="bg-gray-900 text-white hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <User className="text-blue-500 w-6 h-6" />
            <CardTitle className="text-2xl font-semibold">Candidate</CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Explore job opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Explore a variety of job opportunities that align with your skills
              and career goals.
            </p>
          </CardContent>
          <CardFooter className="text-center">
            <p
              className="text-blue-500 font-semibold cursor-pointer"
              onClick={() => handleRoleSelection("candidate")}
            >
              Join now
            </p>
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 text-white hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <Briefcase className="text-red-500 w-6 h-6" />
            <CardTitle className="text-2xl font-semibold">Recruiter</CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Post job listings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Post job listings and connect with top talent to find the best
              candidates for your company.
            </p>
          </CardContent>
          <CardFooter className="text-center">
            <p
              className="text-red-500 font-semibold cursor-pointer"
              onClick={() => handleRoleSelection("recruiter")}
            >
              Post a job
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
