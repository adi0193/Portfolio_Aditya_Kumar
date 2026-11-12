import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { person } from "../data/profile";
import "./Contact.css";

/**
 * There is no backend, so the form composes an email in the visitor's own
 * mail client (mailto:) with their message pre-filled. Nothing is stored.
 */
export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "A sentence or two, please (at least 10 characters).";
    return next;
  };

  const submit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`field-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    const subject = `Hello from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const field = (name, label, props = {}) => {
    const Tag = props.as ?? "input";
    const { as, ...rest } = props;
    return (
      <div className={`field${errors[name] ? " has-error" : ""}`}>
        <label htmlFor={`field-${name}`} className="mono">
          {label}
        </label>
        <Tag
          id={`field-${name}`}
          name={name}
          value={values[name]}
          onChange={update}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `err-${name}` : undefined}
          {...rest}
        />
        {errors[name] && (
          <p id={`err-${name}`} className="field__error">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          id="contact-title"
          index="05"
          label="Contact"
          title={
            <>
              Say <span className="serif accent">hello.</span>
            </>
          }
          intro="Questions about my work, an opportunity, or feedback on something I've built — I read every message."
        />

        <div className="contact__grid">
          <Reveal className="contact__direct">
            <p className="contact__label mono">Email</p>
            <a className="contact__email" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <button type="button" className="contact__copy mono" onClick={copyEmail}>
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              {copied ? "Copied" : "Copy address"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>

            <p className="contact__label mono">Elsewhere</p>
            <ul className="contact__links">
              <li>
                <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={person.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal as="form" className="contact__form" delay={100} noValidate onSubmit={submit}>
            <div className="contact__row">
              {field("name", "Name", { autoComplete: "name", required: true })}
              {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
            </div>
            {field("message", "Message", { as: "textarea", rows: 5, required: true })}
            <div className="contact__submit">
              <button type="submit" className="btn btn--primary">
                <span>Compose email</span>
                <span className="btn__icon" aria-hidden="true">
                  <FiArrowUpRight />
                </span>
              </button>
              <p className="contact__hint mono" aria-live="polite">
                {sent ? "Your mail app should open with the message ready to send." : "Opens in your mail app — nothing is stored here."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
