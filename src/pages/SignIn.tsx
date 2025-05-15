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
import { AuthSchema } from "@/utils/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

const SignIn = ({
  setAuthpage,
}: {
  setAuthpage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const methods = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AuthSchema>) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (err: any) {
      console.log(err);
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
            Sign in to get started!
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
              {error && <p className="text-red-500">{error}</p>}
              <LoadingButton isLoading={loading}>Sign In</LoadingButton>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex w-full text-sm justify-between mt-2">
          No Account yet?
          <span
            className="cursor-pointer text-secondary-foreground flex  justify-self-end"
            onClick={() => setAuthpage("signup")}
          >
            Create One
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
