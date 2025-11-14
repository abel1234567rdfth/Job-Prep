"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { email, z } from "zod";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "signUp" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "signUp") {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = userCredentials.user.uid;
        const res = await fetch("/api/auth-actions/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify({ name, email, userId }),
        });
        const userDocStatus = await res.json();
        if (!userDocStatus.success) {
          toast.error(userDocStatus.message);
          return;
        }
        toast.success("account created successfully");
        router.push("/signIn");
      } else {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed");
          return;
        }
        const res = await fetch("/api/auth-actions/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify({ email, idToken }),
        });
        if (res.ok) {
          window.location.href = "/";
        }
        const userSignInStatus = await res.json();

        toast.success("Sign in sucessfull");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(`There Was an error:${err}`);
    }
  }

  const issignIn = type === "signIn";
  return (
    <div className="card-border lg:min-w-[480px]">
      <div className="flex flex-col gap-6 card py-14 px-10 items-center">
        <div className="flex flex-row gap-2 mx-auto justify-center items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={120}
            width={120}
            className="-ml-12"
          />
          <h2 className="text-primary-100 -ml-12">PrepWise</h2>
        </div>
        <h3>Get ready For jobs with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6  mt-4 form"
          >
            {!issignIn && (
              <FormField
                control={form.control}
                name={"name"}
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name={"email"}
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            <FormField
              control={form.control}
              name={"password"}
              label="Password"
              placeholder="Your Password"
              type="password"
            />

            <Button type="submit" className="w-full">
              {issignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400">
          {issignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!issignIn ? "/signIn" : "/signUp"}
            className="font-bold text-primary-100 ml-1"
          >
            {!issignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
