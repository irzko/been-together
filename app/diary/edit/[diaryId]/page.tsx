import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";
import { unstable_cache } from 'next/cache';
import { redirect } from "next/navigation";
import SubmitButton from "@/components/submit-button";
import moment from "moment";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import ButtonLink from "@/components/ui/ButtonLink";
import Input from "@/components/ui/Input";

const getAllPosts = unstable_cache(
  async () => {
    return await prisma.diary.findMany({ orderBy: { date: "desc" } })
  },
  ['diary'],
  { tags: ['diary'] }
)

export async function generateStaticParams() {
  const diaries: IDiary[] = await getAllPosts();
  return diaries.map((diary) => ({
    diaryId: diary.id,
  }));
}

const getPost = unstable_cache(
  async (diaryId: string) => {
    return await prisma.diary.findUnique({
      where: {
        id: diaryId,
      },
    })
  },
  ['diary'],
  { tags: ['diary'] }
)

const Page = async ({ params }: { params: Promise<{ diaryId: string }> }) => {
  const diaryId = (await params).diaryId
  const diary: IDiary = (await getPost(diaryId))!;
  const updateAction = async (formData: FormData) => {
    "use server";
    await prisma.diary.update({
      where: { id: diaryId },
      data: {
        date: new Date(formData.get("date") as string),
        content: formData.get("content") as string,
        author: formData.get("author") as string,
      },
    });
    revalidateTag("diary");
    redirect("/diary");
  };

  return (
    <>
      <Navbar>
        <NavbarContent>
          <NavbarItem className="flex items-center gap-2">
            <ButtonLink color="light" className="bg-transparent" isIconOnly href="/diary">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </ButtonLink>
          </NavbarItem>
          <NavbarItem>
            <span className="font-semibold">Chỉnh sửa nhật ký</span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <form
        id="diary-form"
        action={updateAction}
        className="p-4 max-w-screen-md mx-auto flex flex-col"
      >
        <div className="mb-6">
          <Input
            type="datetime-local"
            id="date"
            name="date"
            defaultValue={
              diary && moment(diary.date).format("YYYY-MM-DDTHH:mm")
            }
            required
          />
        </div>
        <div className="mb-6">
          <textarea
            id="content"
            rows={15}
            name="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Hãy viết gì đó..."
            defaultValue={diary?.content}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Họ tên hoặc nickname"
            defaultValue={diary?.author}
            required
          ></Input>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default Page;
