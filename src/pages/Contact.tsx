import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "../components/common/Button";
import { services } from "../data/services";
import { siteSettings } from "../data/siteSettings";
import { EnquiryPayload, submitEnquiry, whatsappLinks } from "../api/enquiry";
import Seo from "../seo/Seo";
import { breadcrumbJsonLd } from "../seo/jsonLd";
import styles from "./Contact.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const initialState: EnquiryPayload = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  budget: "",
  consent: false,
};

const budgets = ["Under ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L – ₹50L", "₹50L+", "Not sure yet"];

export default function Contact() {
  const [form, setForm] = useState<EnquiryPayload>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryPayload, string>>>({});

  // Pre-select the service when landing from a Services card
  // (/contact?service=<slug>). The URL param maps to the service's shortTitle
  // so it matches what the service <select> dropdown shows.
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get("service");
    if (!slug) return;
    const match = services.find((s) => s.slug === slug);
    if (match) {
      setForm((f) => ({ ...f, service: match.shortTitle }));
    }
  }, [location.search]);

  const whatsappContacts = useMemo(() => whatsappLinks(form), [form]);

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) {
      next.email = "An email helps us reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email doesn't look right.";
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      next.message = "A couple of sentences helps us prepare for the call.";
    }
    if (!form.consent) {
      next.consent = "We need your consent to reply via email or phone.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update =
    <K extends keyof EnquiryPayload>(key: K) =>
    (value: EnquiryPayload[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      if (errors[key]) {
        setErrors((e) => {
          const { [key]: _removed, ...rest } = e;
          void _removed;
          return rest;
        });
      }
    };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setFeedback("");
    const result = await submitEnquiry(form);
    if (result.ok) {
      setStatus("success");
      setFeedback(result.message ?? "Enquiry received — we'll be in touch within 1 business day.");
      setForm(initialState);
    } else if (result.mode === "none") {
      setStatus("error");
      setFeedback(
        "This form is not yet connected to a backend or Google Form. The site owner needs to set VITE_API_BASE_URL or VITE_GOOGLE_FORMS_ENDPOINT (and the entry IDs) in .env.local before enquiries can be received."
      );
    } else {
      setStatus("error");
      setFeedback(result.message ?? "Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <div className={styles.page}>
      <Seo
        title="Contact — Start a Project"
        description="Tell us about your business, your goals, and the kind of creative impact you want to make. Email, phone, WhatsApp, or send an enquiry — Minkup Media Technology, Coimbatore."
        path="/contact"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">CONTACT · START A PROJECT</p>
          <h1 className={styles.title}>
            <span>LET&apos;S MAKE</span>
            <br />
            <span>
              YOUR NEXT <span className="text-orange">MOVE.</span>
            </span>
          </h1>
          <p className={styles.lede}>
            Tell us about your business, your goals, and the kind of creative
            impact you want to make. We&apos;ll be back within one business day
            with a plan or a call.
          </p>
        </div>
      </section>

      <section className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <p className="eyebrow">THE SHORT WAY</p>
                <h3>Would you rather chat?</h3>
                <p>
                  Prefer a quick back-and-forth? Reach us on WhatsApp or email —
                  whichever matches the pace of your project.
                </p>

                <ul className={styles.contactList}>
                  <li>
                    <span className={styles.contactIcon}>
                      <Mail size={18} />
                    </span>
                    <a href={`mailto:${siteSettings.contactEmailPlaceholder}`}>
                      {siteSettings.contactEmailPlaceholder}
                    </a>
                  </li>
                  <li>
                    <span className={styles.contactIcon}>
                      <Phone size={18} />
                    </span>
                    <a
                      href={`tel:${siteSettings.contactPhonePlaceholder.replace(/\s+/g, "")}`}
                    >
                      {siteSettings.contactPhonePlaceholder}
                    </a>
                  </li>
                  <li>
                    <span className={styles.contactIcon}>
                      <MapPin size={18} />
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        siteSettings.addressPlaceholder
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteSettings.addressPlaceholder}
                    </a>
                  </li>
                </ul>

                {whatsappContacts.length > 0 && (
                  <div className={styles.waGroup}>
                    {whatsappContacts.map((c) => (
                      <Button
                        key={c.href}
                        as="a"
                        href={c.href}
                        variant="primary"
                        size="md"
                        withArrow
                        className={styles.waBtn}
                      >
                        <MessageCircle size={16} />
                        {whatsappContacts.length > 1
                          ? `WhatsApp ${c.phone}`
                          : "WhatsApp us"}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.hoursCard}>
                <h4>Response SLA</h4>
                <p>Mon–Fri · reply within 1 business day</p>
                <p className={styles.quietLine}>We check email once per morning, afternoon, and evening.</p>
              </div>
            </aside>

            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <fieldset className={styles.fieldset} disabled={status === "submitting"}>
                <legend className="eyebrow">PROJECT ENQUIRY</legend>

                <div className={styles.row}>
                  <Field
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={update("name")}
                    error={errors.name}
                    required
                  />
                  <Field
                    label="Business name"
                    name="businessName"
                    value={form.businessName}
                    onChange={update("businessName")}
                    error={errors.businessName}
                  />
                </div>

                <div className={styles.row}>
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update("email")}
                    error={errors.email}
                    required
                  />
                  <Field
                    label="Phone or WhatsApp"
                    name="phone"
                    value={form.phone}
                    onChange={update("phone")}
                    error={errors.phone}
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="service">
                    Service of interest <span className={styles.optional}>· optional</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={(e) => update("service")(e.target.value)}
                  >
                    <option value="">Choose a service…</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet — advise me</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">
                    Tell us about your project <span className={styles.req}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    placeholder="Who you are, what you sell, what's missing, when you need it done."
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className={styles.errorText}>{errors.message}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label>
                    Budget range <span className={styles.optional}>· optional</span>
                  </label>
                  <div className={styles.budgetGrid}>
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`${styles.budgetChip} ${form.budget === b ? styles.budgetChipActive : ""}`}
                        onClick={() => update("budget")(b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent")(e.target.checked)}
                  />
                  <span>
                    I agree Minkup Media Technology may contact me about my
                    enquiry by email or phone.
                  </span>
                </label>
                {errors.consent && (
                  <span className={styles.errorText}>{errors.consent}</span>
                )}

                <div className={styles.submitRow}>
                  <Button
                    as="button"
                    type="submit"
                    variant="primary"
                    size="lg"
                    withArrow={status !== "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className={styles.spin} /> Sending…
                      </>
                    ) : (
                      "Send Enquiry"
                    )}
                  </Button>
                  <span className={styles.submitNote}>
                    We reply within one business day. No marketing lists, ever.
                  </span>
                </div>

                {status === "success" && (
                  <div className={`${styles.callout} ${styles.ok}`} role="status">
                    <CheckCircle2 size={20} />
                    <span>{feedback}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className={`${styles.callout} ${styles.err}`} role="alert">
                    <AlertCircle size={20} />
                    <span>{feedback}</span>
                  </div>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

function Field({ label, name, value, onChange, type = "text", error, required, placeholder }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>
        {label} {required && <span className={styles.req}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
