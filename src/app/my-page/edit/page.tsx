import { isNil } from "lodash";
import { showUserAction } from "@/server/authActions";
import SignUpFormView from "@/view/auth/SignUpFormView";
import { isNotNil } from "@/ex/utils";

const Page = async () => {
  const res = await showUserAction();

  if (isNotNil(res.error) || isNil(res.data)) {
    return <></>;
  }

  return <SignUpFormView data={res.data} />;
};

export default Page;
