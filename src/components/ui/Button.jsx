import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Link styled as a button. Uses react-router <Link> for internal routes,
 * a plain <a> for everything else.
 */
export default function Button({ href, to, variant = "primary", size, external, icon, children, className = "", ...rest }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} className={cls} {...externalProps} {...rest}>
      {content}
    </a>
  );
}
