import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export const ContactForm = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    message?: string;
    detail?: string;
  } | null>(null);

  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: any) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`,
      function () {
        //do nothing
      },
    );
  }, []);

  const handleOnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_KEY, { action: 'submit' })
        .then((token: string) => {
          submitData(token);
        });
    });
  };

  const submitData = async (token: string) => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        'g-recaptcha-response': token,
      }),
    });
    const result = await response.json();
    setLoading(false);
    setResponse(result);
  };

  return (
    <form id="contact-form" onSubmit={handleOnSubmit}>
      <div className="control-group">
        <div className="controls">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            id="name"
            name="name"
            required
            data-validation-required-message="Please enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p className="help-block"></p>
        </div>
      </div>
      <div className="control-group">
        <div className="controls">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            id="email"
            name="email"
            required
            data-validation-required-message="Please enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>
      <div className="control-group">
        <div className="controls">
          <textarea
            rows={10}
            cols={100}
            className="form-control"
            placeholder="Message"
            id="message"
            name="message"
            required
            data-validation-required-message="Please enter your message"
            minLength={5}
            data-validation-minlength-message="Min 5 characters"
            maxLength={999}
            style={{ resize: 'none' }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary pull-right"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>

      <br />
      <div id="success">
        {response && response.message && (
          <span className="label-warning">
            {response.message + ' ' + response.detail}
          </span>
        )}
        {response && response.message === undefined && (
          <span className="text-success">
            <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon> Thank
            you for your message. I will send you response within one day.
          </span>
        )}
      </div>
    </form>
  );
};
