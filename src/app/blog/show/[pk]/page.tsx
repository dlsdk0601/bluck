import Image from "next/image";
import BlogButtonBoxView from "@/view/blog/BlogButtonBoxView";

const BlogShowPage = () => {
  return (
    <div className="mx-auto h-[75vh] w-3/5 overflow-auto mobile:w-[95%]">
      <div className="overflow-hidden rounded-t-3xl">
        {/* 이미지 */}
        <figure className="relative h-[300px] w-full mobile:h-[200px]">
          <Image fill src="/assets/img/dog.png" alt="blog-show-banner" sizes="100%" />
        </figure>
        {/* 작성자 */}
        <div className="mx-auto my-5 flex w-11/12 items-center justify-between">
          <div className="flex items-center justify-between">
            <figure className="relative h-[35px] w-[35px] mobile:h-[25px] mobile:w-[25px]">
              <Image fill src="/assets/img/blackProfile.png" alt="profile" />
            </figure>
            <div className="ml-3">
              <p className="text-l font-bold mobile:text-sm">user name</p>
              <p className="text-l bold mx-0 my-2 mobile:mb-0 mobile:mt-1 mobile:text-sm">
                2023.01.23
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mobile:mr-2">
            <figure className="relative ml-3 h-[20px] w-[20px] cursor-pointer mobile:h-[15px] mobile:w-[15px]">
              <Image fill src="/assets/img/blackLink.png" alt="link" />
            </figure>
            <figure className="relative ml-3 h-[20px] w-[20px] cursor-pointer mobile:h-[15px] mobile:w-[15px]">
              <Image fill src="/assets/img/blackShare.png" alt="link" />
            </figure>
          </div>
        </div>

        {/* 태그 정보 */}
        <div className="my-7 flex w-11/12 flex-wrap items-center justify-start mobile:mx-auto mobile:my-3">
          <p className="text-l mr-2 flex  items-center justify-center rounded-xl bg-c1f295a px-2 py-2 text-ccfd1dd opacity-80 mobile:h-[24px] mobile:rounded-l mobile:py-1 mobile:text-sm">
            블라블라
          </p>
          <p className="text-l mr-2 flex  items-center justify-center rounded-xl bg-c1f295a px-2 py-2 text-ccfd1dd opacity-80 mobile:h-[24px] mobile:rounded-l mobile:py-1 mobile:text-sm">
            블라
          </p>
        </div>

        {/* 본문 */}
        <div className="mx-auto h-full w-11/12">
          Aliquip fugiat eu consectetur esse irure adipisicing. Anim adipisicing nostrud ullamco
          magna. Incididunt reprehenderit velit do culpa. Elit anim consequat fugiat sint aliquip
          aliquip pariatur sunt labore magna cillum. Deserunt mollit culpa excepteur elit Lorem
          culpa eiusmod amet eiusmod in qui. Esse est magna aliqua ut dolore in proident. Veniam
          amet laborum aliquip proident velit eiusmod ex fugiat deserunt reprehenderit. Lorem
          consequat minim ipsum aliquip ea veniam in nisi proident. Adipisicing nostrud eu irure
          laborum consectetur excepteur et est enim adipisicing consectetur veniam labore eiusmod.
          Laborum velit labore minim eu exercitation deserunt ex. Aliquip reprehenderit qui esse
          velit. Ea non non labore adipisicing dolor exercitation culpa do id non. Ut ex officia
          esse sint incididunt cupidatat aliquip anim excepteur Lorem ullamco. Esse minim minim
          voluptate non culpa quis duis dolor laborum ea nisi sit. Aliquip amet voluptate aliquip
          officia eiusmod enim. Sunt sit anim culpa nostrud enim veniam nulla aliquip pariatur
          reprehenderit et Lorem enim. Ullamco ea cupidatat exercitation consectetur dolore irure
          pariatur ad tempor. Aute in ipsum duis voluptate. Lorem consequat elit officia ea veniam
          incididunt amet eiusmod deserunt mollit. Velit ad consequat exercitation irure sunt et
          aute et ullamco aliqua laboris commodo nisi. Aliquip exercitation consequat cillum aliquip
          mollit labore. Duis exercitation dolor dolore consequat excepteur ex officia. Sunt veniam
          velit cupidatat Lorem officia irure eu laborum duis aliquip. Ea cupidatat velit id eiusmod
          reprehenderit voluptate. Irure labore in exercitation magna amet proident do. Minim duis
          velit in commodo veniam est elit dolore Lorem est nisi laborum non. Sit nisi eiusmod duis
          excepteur adipisicing est occaecat. Enim occaecat deserunt irure consectetur ex cupidatat
          eiusmod est irure. Ad culpa pariatur aute tempor proident cillum quis sunt enim
          consectetur nulla labore qui id. Enim non cupidatat laboris irure irure duis. Proident in
          Lorem ad cillum sint nulla voluptate. Ad proident eu duis proident laboris incididunt
          proident cillum est non proident aliquip proident. Eiusmod magna magna nostrud anim sunt
          magna. Lorem ea cillum voluptate ipsum ut et nostrud occaecat nisi nostrud pariatur Lorem.
          Anim ullamco ex dolor non irure ut officia duis et veniam. Cupidatat deserunt irure mollit
          enim non proident. Sit excepteur nulla sunt minim ea adipisicing nulla id. Reprehenderit
          adipisicing reprehenderit irure mollit cupidatat laborum aute culpa tempor. Commodo do
          aliquip velit Lorem mollit nulla amet aliquip culpa sint nulla laboris culpa cillum. Nulla
          sit aliqua nostrud id est culpa enim fugiat non aute nulla velit commodo irure. Duis
          nostrud deserunt excepteur deserunt eiusmod aute. Cillum veniam ullamco deserunt voluptate
          sit in. In reprehenderit et consequat sunt veniam ut sunt. Ea proident sint eu quis ipsum
          enim aliquip anim ut laboris in cillum officia. Aliqua exercitation ad veniam irure
          commodo et incididunt laboris ipsum consectetur pariatur. Culpa dolore sunt mollit
          reprehenderit voluptate enim aliqua aliqua pariatur officia eu qui sint commodo. Proident
          ut labore irure adipisicing sit id consectetur enim enim do. Consequat labore tempor
          fugiat aliqua nulla magna officia laboris elit nulla amet voluptate cillum. Ad
          exercitation aliquip fugiat mollit eu velit in ipsum. Adipisicing dolore commodo non
          ullamco cillum qui ut incididunt non Lorem velit adipisicing exercitation. Incididunt
          magna magna laborum culpa ullamco tempor commodo ad irure exercitation occaecat enim
          incididunt dolor. Veniam laborum do ut laboris deserunt eiusmod ea aliquip. Cillum ut
          adipisicing pariatur eu pariatur non officia excepteur ea amet dolor. deserunt voluptate
          sit in. In reprehenderit et consequat sunt veniam ut sunt. Ea proident sint eu quis ipsum
          enim aliquip anim ut laboris in cillum officia. Aliqua exercitation ad veniam irure
          commodo et incididunt laboris ipsum consectetur pariatur. Culpa dolore sunt mollit
          reprehenderit voluptate enim aliqua aliqua pariatur officia eu qui sint commodo. Proident
          ut labore irure adipisicing sit id consectetur enim enim do. Consequat labore tempor
          fugiat aliqua nulla magna officia laboris elit nulla amet voluptate cillum. Ad
          exercitation aliquip fugiat mollit eu velit in ipsum. Adipisicing dolore commodo non
          ullamco cillum qui ut incididunt non Lorem velit adipisicing exercitation. Incididunt
          magna magna laborum culpa ullamco tempor commodo ad irure exercitation occaecat enim
          incididunt dolor. Veniam laborum do ut laboris deserunt eiusmod ea aliquip. Cillum ut
          adipisicing pariatur eu pariatur non officia excepteur ea amet dolor. deserunt voluptate
          sit in. In reprehenderit et consequat sunt veniam ut sunt. Ea proident sint eu quis ipsum
          enim aliquip anim ut laboris in cillum officia. Aliqua exercitation ad veniam irure
          commodo et incididunt laboris ipsum consectetur pariatur. Culpa dolore sunt mollit
          reprehenderit voluptate enim aliqua aliqua pariatur officia eu qui sint commodo. Proident
          ut labore irure adipisicing sit id consectetur enim enim do. Consequat labore tempor
          fugiat aliqua nulla magna officia laboris elit nulla amet voluptate cillum. Ad
          exercitation aliquip fugiat mollit eu velit in ipsum. Adipisicing dolore commodo non
          ullamco cillum qui ut incididunt non Lorem velit adipisicing exercitation. Incididunt
          magna magna laborum culpa ullamco tempor commodo ad irure exercitation occaecat enim
          incididunt dolor. Veniam laborum do ut laboris deserunt eiusmod ea aliquip. Cillum ut
          adipisicing pariatur eu pariatur non officia excepteur ea amet dolor.
        </div>

        {/* 코멘트 */}
        <div className="my-16 mr-3 flex items-center justify-end mobile:ml-2 mobile:w-[60%]">
          <figure className="mx-[5px] flex items-center justify-between">
            <Image width={14} height={14} src="/assets/img/blackCommend.png" alt="commend" />
            <figcaption className="ml-[10px] text-[14px]  mobile:ml-[2px] mobile:text-[10px]">
              1000
            </figcaption>
          </figure>
          <figure className="mx-[5px] flex items-center justify-between">
            <Image width={14} height={14} src="/assets/img/blackFind.png" alt="blackFind" />
            <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
              1000
            </figcaption>
          </figure>
          <figure className="mx-[5px] flex items-center justify-between">
            <Image width={14} height={14} src="/assets/img/blackLike.png" alt="blackLike" />
            <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
              1000
            </figcaption>
          </figure>
        </div>

        {/* 버튼 박스 */}
        <BlogButtonBoxView
          nextBlogPk={3}
          nextBlogTitle="다음 포스트 제목"
          prevBlogPk={2}
          prevBlogTitle="이전 포스트 제목"
        />
      </div>
    </div>
  );
};

export default BlogShowPage;
