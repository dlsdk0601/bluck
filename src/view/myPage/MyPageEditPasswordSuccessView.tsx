const MyPageEditPasswordSuccessView = () => {
  return (
    <form className="mx-auto flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-3/4 mobile:w-full">
      <p className="text-center">
        비밀번호가 정상적으로 수정되었습니다. <br />
        다시 로그인을 해주세요.
      </p>
      <button
        type="submit"
        className="mt-3 block rounded border-[1px] border-solid border-c1f295a px-1 py-2 text-center dark:border-cffffff"
      >
        로그인
      </button>
    </form>
  );
};

export default MyPageEditPasswordSuccessView;
