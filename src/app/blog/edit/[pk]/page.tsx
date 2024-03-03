import BlogEditorView from "@/view/blog/BlogEditorView";

const BlogEditPage = () => {
  return (
    <div className="mx-auto my-0 flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-[75%] mobile:w-full">
      <BlogEditorView />
    </div>
  );
};

export default BlogEditPage;
