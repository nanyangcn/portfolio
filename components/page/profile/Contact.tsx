import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import sendEmail, { Email } from 'actions/sendEmail';
import {
  VscCheck, VscError, VscLoading, VscSend,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

const emailSchema = Yup.object().shape({
  senderEmail: Yup.string().email('Invalid email').required('Required'),
  subject: Yup.string().required('Required'),
  text: Yup.string().required('Required'),
});

function FormError({ error, touched }: { error?: string; touched?: boolean }) {
  if (!error || !touched) return null;
  return (
    <p className="absolute inset-y-0 right-0 flex px-2 pt-2 text-red-500">{error}</p>
  );
}

function FormInput({
  label,
  name,
  type,
  as,
  rows,
  placeholder,
  disabled = false,
  children = null,
}:
{
  label: string,
  name: string,
  type?: string,
  as?: string,
  rows?: number,
  placeholder?: string,
  disabled?: boolean,
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex items-baseline gap-x-2">
      {label !== '' && <label htmlFor={name} className="min-w-[60px]">{label}</label>}
      <Field
        name={name}
        type={type}
        as={as}
        rows={rows}
        placeholder={placeholder}
        className="grow rounded-md p-2 hover:brightness-125 [&::placeholder]:text-text-secondary"
        disabled={disabled}
      />
      {children}
    </div>
  );
}

function FormSendButton({ errors, isSubmitting, successStatus }: {
  errors: Record<string, string>;
  isSubmitting: boolean;
  successStatus: number;
}) {
  let buttonContent = (
    <div className="flex items-center gap-x-2">
      <VscSend size={24} />
      <p>Send</p>
    </div>
  );

  if (isSubmitting) {
    buttonContent = (
      <div className="flex items-center gap-x-2">
        <VscLoading size={24} className="animate-spin" />
        <p>Sending...</p>
      </div>
    );
  }

  if (successStatus === 1) {
    buttonContent = (
      <div className="flex items-center gap-x-2">
        <VscCheck size={24} />
        <p>Sent Successfully</p>
      </div>
    );
  }

  if (successStatus === -1) {
    buttonContent = (
      <div className="flex items-center gap-x-2">
        <VscError size={24} />
        <p>Send Failed</p>
      </div>
    );
  }

  return (
    <button
      type="submit"
      disabled={Object.values(errors).some((error) => error) || isSubmitting}
      className={twMerge(
        `flex items-center justify-center rounded-md bg-primary
        py-2 text-xl disabled:cursor-not-allowed hover:brightness-125`,
        isSubmitting ? 'disabled:bg-yellow-700' : 'disabled:bg-border-primary',
        successStatus === 1 ? 'bg-green-700' : '',
        successStatus === -1 ? 'bg-red-700' : '',
      )}
    >
      <div className="flex items-center gap-x-2">
        {buttonContent}
      </div>
    </button>
  );
}

function Contact() {
  const [successStatus, setSuccessStatus] = useState<number>(0);

  const handleSubmit = async (values: Email) => {
    setSuccessStatus(0);
    const response = await sendEmail(values);
    if (response.data?.id) {
      setSuccessStatus(1);
    } else {
      setSuccessStatus(-1);
    }
  };

  return (
    <div className="flex h-fit snap-center flex-col gap-y-6 py-8" id="contact">
      <h2 className="text-3xl xl:mx-[5%] 2xl:mx-[10%]">Contact </h2>
      <p className="italic xl:mx-[5%] 2xl:mx-[10%]">
        Sending a message via the following form will send an email to my email address:
        <span className="px-1 underline">nanyangcn@gmail.com</span>
      </p>
      <Formik
        initialValues={{
          senderEmail: '',
          receiverEmail: 'nanyangcn@gmail.com',
          subject: '',
          text: '',
        }}
        validationSchema={emailSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form
            className="flex max-w-[1000px] flex-col gap-y-4 rounded-lg
            border-2 border-border-primary px-2 py-4 xl:mx-[5%] 2xl:mx-[10%]"
          >
            <FormSendButton errors={errors} isSubmitting={isSubmitting} successStatus={successStatus} />
            <FormInput label="From" name="senderEmail" type="email" placeholder="e.g. example@example.com">
              <FormError error={errors.senderEmail} touched={touched.senderEmail} />
            </FormInput>
            <FormInput label="To" name="receiverEmail" type="email" disabled />
            <FormInput label="Subject" name="subject" type="text">
              <FormError error={errors.subject} touched={touched.subject} />
            </FormInput>
            <FormInput label="" name="text" as="textarea" rows={20}>
              <FormError error={errors.text} touched={touched.text} />
            </FormInput>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Contact;
