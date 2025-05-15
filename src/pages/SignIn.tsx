import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

const SignIn = () => {
  const [error, setError] = useState("");
  const methods = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AuthSchema>) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
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
          <CardDescription className="text-center text-lg">
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit">Sign In</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
