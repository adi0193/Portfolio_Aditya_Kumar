import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Note from "../components/ui/Note";
import { person } from "../data/profile";
import "./Contact.css";

/**
 * There's no backend, so the form composes the email in the visitor's own
 * mail client (mailto:) with the message filled in. Nothing is stored.
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

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Your name, please.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "That email address doesn't look quite right.";
    if (values.message.trim().length < 10) next.message = "A sentence or two, please.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const subject = `A question from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const field = (name, label, extra = {}) => {
    const { as: Tag = "input", ...rest } = extra;
    return (
      <div className={`field${errors[name] ? " has-error" : ""}`}>
        <label htmlFor={`f-${name}`} className="label">
          {label}
        </label>
        <Tag
          id={`f-${name}`}
          name={name}
          value={values[name]}
          onChange={update}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `e-${name}` : undefined}
          {...rest}
        />
        {errors[name] && (
          <p id={`e-${name}`} className="field__error">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="section contact dark" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead
          id="contact-title"
          no="05"
          label="Contact"
          title={
            <>
              Every good conversation starts with a <em>question.</em>
            </>
          }
          kicker="Have an interesting problem, a product idea, or simply want to talk about engineering? Let's connect."
        />

        <div className="contact__grid">
          <Reveal className="contact__direct">
            <p className="label">Write to</p>
            <a className="contact__email link" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <button type="button" className="contact__copy mono" onClick={copy}>
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              {copied ? "Copied" : "Copy address"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>

            <p className="label contact__else">Or find me at</p>
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
              <li>
                <Link to="/resume">
                  Résumé <FiArrowRight aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </Reveal>

          <Reveal as="form" delay={120} className="contact__form" noValidate onSubmit={submit}>
            <div className="contact__row">
              {field("name", "Your name", { autoComplete: "name" })}
              {field("email", "Your email", { type: "email", autoComplete: "email" })}
            </div>
            {field("message", "Your question", { as: "textarea", rows: 5 })}
            <div className="contact__submit">
              <button type="submit" className="btn btn--primary">
                <span>Start a conversation</span>
                <span className="btn__icon" aria-hidden="true">
                  <FiArrowRight />
                </span>
              </button>
              <p className="contact__hint mono" aria-live="polite">
                {sent ? "Your mail app should now be open, with the message ready." : "Opens your mail app. Nothing is stored here."}
              </p>
            </div>
            <Note>No backend, no database: the form simply writes the email for you.</Note>
          </Reveal>
        </div>

        <Reveal as="p" className="contact__promise">
          I promise to pay attention.
        </Reveal>
      </div>
    </section>
  );
}
