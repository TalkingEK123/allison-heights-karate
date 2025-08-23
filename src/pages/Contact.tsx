/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const FORM_ENDPOINT = "https://formspree.io/f/xyzppkve"; // keep your endpoint here

  const [state, setState] = useState<FormState>("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    inquiry: "Trial class",
    message: "",
    ahk_hp: "", // honeypot (must stay empty)
  });

  // For a little polish: scroll success/error card into view
  const topRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (state === "success" || state === "error") {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");

    // Honeypot check (bots fill hidden fields)
    if (form.ahk_hp) {
      setState("success"); // silently succeed
      return;
    }

    // Basic required checks on the client (accessibility keeps native "required" too)
    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill in your name, email, and message.");
      setState("error");
      return;
    }

    try {
      setState("submitting");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          age: form.age,
          inquiry: form.inquiry,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          age: "",
          inquiry: "Trial class",
          message: "",
          ahk_hp: "",
        });
      } else {
        setErrMsg(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
        setState("error");
      }
    } catch (err: any) {
      setErrMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <main id="main" className="bg-brand-900 text-primary">
      {/* Compact header */}
      <section className="py-8 md:py-10 border-b border-steel/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-primary/80 uppercase tracking-[0.18em] text-[11px] md:text-xs">
                Allison Heights Karate
              </p>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Contact Us</h1>
              <p className="mt-2 text-primary/85 max-w-2xl">
                Ready to try a class or have questions? Send us a message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14">
        <div ref={topRef} className="mx-auto max-w-6xl px-4 md:px-6 grid gap-10 lg:grid-cols-[minmax(0,1fr),minmax(300px,420px)]">
          {/* LEFT: Form */}
          <Card className="bg-white/[0.06] border-white/10 backdrop-blur-sm rounded-xl">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white">Send a Message</h2>
              <p className="mt-1 text-white/70 text-sm">We’ll get back to you as soon as possible.</p>

              {/* Success / Error states */}
              {state === "success" && (
                <div className="mt-5 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-green-300">
                  Thanks! Your message has been sent.
                </div>
              )}
              {state === "error" && (
                <div className="mt-5 rounded-lg border border-[#EF4444]/60 bg-[#EF4444]/10 p-3 text-[#FCA5A5]">
                  {errMsg || "There was a problem sending your message."}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                {/* Honeypot (hidden) */}
                <input
                  type="text"
                  name="ahk_hp"
                  value={form.ahk_hp}
                  onChange={onChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={onChange}
                      className="mt-1 bg-black/30 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/40"
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      className="mt-1 bg-black/30 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/40"
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Phone + Age */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange}
                      className="mt-1 bg-black/30 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/40"
                      placeholder="(506) 555‑1234"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-white">Age (if student)</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={form.age}
                      onChange={onChange}
                      className="mt-1 bg-black/30 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/40"
                      placeholder="12"
                      min={0}
                      inputMode="numeric"
                    />
                  </div>
                </div>

                {/* Inquiry Type (compact chips) */}
                <fieldset>
                  <legend className="text-white text-sm">Reason</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Trial class", "Membership", "Competition team", "Other"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, inquiry: opt }))}
                        className={
                          "rounded-md border px-3 py-1 text-sm transition " +
                          (form.inquiry === opt
                            ? "border-white/30 bg-white/15 text-white"
                            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10")
                        }
                        aria-pressed={form.inquiry === opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Message + counter */}
                <div>
                  <Label htmlFor="message" className="text-white">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    className="mt-1 bg-black/30 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/40"
                    placeholder="Tell us about your goals, experience level, or any questions…"
                  />
                  <div className="mt-1 text-right text-xs text-white/50">
                    {form.message.length}/1000
                  </div>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-white/60">
                  We respect your privacy and never share your details.
                </p>

                <Button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full bg-[#4F7DFF] hover:bg-[#3C64D8] text-white disabled:opacity-70"
                >
                  {state === "submitting" ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT: Info panel */}
          <div className="space-y-6">
            {/* Location / Contact quick cards */}
            <Card className="bg-white/[0.06] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg">Dojo Location</h3>
                <div className="mt-4 grid gap-4 text-white/85">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">Address</p>
                    <p>200 Karolie Rd<br />Riverview, NB E1B 1R1</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 min-w-0">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/60">Phone</p>
                      <a href="tel:+15062953889" className="hover:underline block max-w-full break-words">
                        (506) 295‑3889
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/60">Email</p>
                      <a
                        href="mailto:info@allisonheightskarate.com"
                        className="hover:underline block max-w-full break-all md:break-words"
                      >
                        info@allisonheightskarate.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.06] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg">Training Hours</h3>
                <div className="mt-4 space-y-2 text-white/85">
                  <div className="flex items-center justify-between gap-3">
                    <span>Mon, Thu, Fri</span>
                    <span className="text-white">6:00 PM – 8:15 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trial CTA */}
            <Card className="bg-white/[0.06] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg">Free Trial Class</h3>
                <p className="mt-2 text-white/85">
                  Try your first class on us. No equipment needed — athletic clothes are fine. Please arrive 10 minutes early.
                </p>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="bg-white/[0.06] border-white/10 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] md:aspect-[5/3]">
                  <iframe
                    title="Allison Heights Karate Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11061.47373741081!2d-64.7999!3d46.0529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b9a661ffdd23%3A0x6a4b45f9b9a4f6e2!2s20%20Karolie%20Rd%2C%20Riverview%2C%20NB%20E1B%201R1!5e0!3m2!1sen!2sca!4v1693320011100!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
