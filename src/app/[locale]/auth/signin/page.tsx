import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Form } from "../_components/Form";
import { getDictionary } from "@/lib/translation";

export default async function SignInPage() {
  const locale = await getCurrentLocale();
  const translation = await getDictionary(locale);
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-black text-center mb-4">
              {translation.auth.login.title}
            </h2>
            <Form translate={translation} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translation.auth.login.authPrompt.message}</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}>
                {translation.auth.login.authPrompt.signUpLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
