/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"

import envConfig from "@/config/envConfig"
import { Form } from "antd"
import { useEffect } from "react"
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form"
interface FormWrapperProps<T extends FieldValues = FieldValues> {
  onSubmit: SubmitHandler<T>
  children: React.ReactNode
  defaultValues?: T
  resolver?: Resolver<T>
  className?: string
}

export default function FormWrapper<T extends FieldValues = FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
  className,
}: FormWrapperProps<T>) {
  const formConfig: UseFormProps<T> = {}

  if (resolver) {
    formConfig["resolver"] = resolver
  }

  const methods = useForm<T>(formConfig)

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues)
    }
  }, [defaultValues, methods])

  const handleSubmit = (data: T) => {
    onSubmit(data)

    if (envConfig()?.nodeEnv !== "development") {
      methods.reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        onFinish={methods.handleSubmit(handleSubmit)}
        className={className}
      >
        {children}
      </Form>
    </FormProvider>
  )
}
