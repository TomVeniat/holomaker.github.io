import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import {buttonCSS, form__groupCSS, form__fieldCSS, form__labelCSS, formCSS} from './styles';



// const EmailListForm: React.FunctionComponent<{}> = () => {

interface OwnProps {
  callName: string;
  uniqueId: string;
}
export default function emailListForm({ callName, uniqueId }: OwnProps) {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToMailchimp(email)
      .then((data) => {
        alert('You have subscribed ;-)');
      })
      .catch((error: Error) => {
        alert('Sorry it did not work. Please send us a mail to subscribe');
        // Errors in here are client side
        // Mailchimp always returns a 200
      });
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      css={formCSS}
    >
      <div css={form__groupCSS}>
        <input
          type="email"
          css={form__fieldCSS}
          placeholder="Email"
          name="email"
          id={uniqueId}
          onChange={handleEmailChange}
          required
        />
        <label for={uniqueId} css={form__labelCSS} className={'formLabel'}>
          Email
        </label>
        <button type="submit" css={buttonCSS}>
          {callName}
        </button>
      </div>
    </form>
  );
}

// export default EmailListForm;
