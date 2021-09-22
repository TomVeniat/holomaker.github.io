import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import './mailchimpForm.scss';

const buttonCSS: CSSObject = {
  backgroundImage:
    'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)',
  borderRadius: '100rem',
  border: 'none',
  fontWeight: 900,
  // backgroundColor: 'black',
  color: 'black',
  padding: '1em 2em 1em 2em',
  margin: '1em',
  transition: 'all 150ms linear',
  filter: 'saturate(1)',

  '&:hover': {
    transform: 'scale(1.1)',
    cursor: 'pointer',
    transition: 'all 150ms linear',
    filter: 'saturate(1.3)',
  },
};

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
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <div class="form__group field">
        <input
          type="email"
          class="form__field"
          placeholder="Email"
          name="email"
          id={uniqueId}
          onChange={handleEmailChange}
          required
        />
        <label for={uniqueId} class="form__label">
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
