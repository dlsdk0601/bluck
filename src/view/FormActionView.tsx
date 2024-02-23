"use client";

import { ComponentType, Fragment, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { BaseFormActionFunction, FormActionViewProps } from "@/type/definitions";

const FormActionView = <T,>(
  action: BaseFormActionFunction<T>,
  Component: ComponentType<FormActionViewProps<T>>,
): (() => JSX.Element) => {
  return function FormAction() {
    const [res, dispatch] = useFormState(action, null);
    const [child, setChild] = useState(<Component res={res} dispatch={dispatch} />);

    useEffect(() => {
      setChild(<Component res={res} dispatch={dispatch} />);
    }, [res]);

    return <>{child}</>;
  };
};

export default FormActionView;
