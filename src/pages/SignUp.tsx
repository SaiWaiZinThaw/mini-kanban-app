import LoadingButton from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/utils/firebase";
import { SignUpSchema } from "@/utils/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

const SignUp = ({
  setAuthpage,
}: {
  setAuthpage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const methods = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="min-w-[400px] gap-0 border-b-4 border-2 border-r-4">
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl">
            A Mini Kanban App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-lg mb-2">
            Sign up to get the most out of the app
          </CardDescription>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Renter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <LoadingButton isLoading={loading}>Sign Up</LoadingButton>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex w-full text-sm justify-between mt-2">
          Already have an account?
          <span
            className="cursor-pointer text-secondary-foreground flex  justify-self-end"
            onClick={() => setAuthpage("signin")}
          >
            Sign In
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
