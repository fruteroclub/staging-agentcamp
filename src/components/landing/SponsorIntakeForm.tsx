import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SponsorIntakeForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const sponsorFormSchema = z.object({
    name: z.string().min(2, t("sponsorDeck.form.validation.name")),
    email: z.string().email(t("sponsorDeck.form.validation.email")),
    company: z.string().min(1, t("sponsorDeck.form.validation.company")),
    role: z.string().optional(),
    tierInterest: z.string().optional(),
    message: z.string().optional(),
  });

  type SponsorFormValues = z.infer<typeof sponsorFormSchema>;

  const TIERS = [
    { value: "founding", label: t("sponsorDeck.form.tiers.founding") },
    { value: "infrastructure", label: t("sponsorDeck.form.tiers.infrastructure") },
    { value: "startup", label: t("sponsorDeck.form.tiers.startup") },
    { value: "community", label: t("sponsorDeck.form.tiers.community") },
    { value: "unsure", label: t("sponsorDeck.form.tiers.unsure") },
  ];

  const form = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      tierInterest: "",
      message: "",
    },
  });

  async function onSubmit(data: SponsorFormValues) {
    setStatus("submitting");
    setErrorMsg("");

    const siteUrl = import.meta.env.VITE_GODINEZ_AI_SITE_URL;
    if (!siteUrl) {
      console.error("VITE_GODINEZ_AI_SITE_URL not configured");
      setStatus("error");
      setErrorMsg("Configuration error. Please email mel@frutero.club instead.");
      return;
    }

    try {
      const res = await fetch(`${siteUrl}/sponsor-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "sponsorship-deck" }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      form.reset();
    } catch (e) {
      console.error("Sponsor form error:", e);
      setStatus("error");
      setErrorMsg(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    }
  }

  const inputClasses =
    "bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-[10px] h-12 text-[15px]";

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12"
          >
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t("sponsorDeck.form.successTitle")}
            </h3>
            <p className="text-muted-foreground text-[15px]">
              {t("sponsorDeck.form.successMsg")}
            </p>
            <Button
              variant="ghost"
              className="mt-6 text-muted-foreground hover:text-foreground"
              onClick={() => setStatus("idle")}
            >
              {t("sponsorDeck.form.submitAnother")}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/80 text-sm">
                  {t("sponsorDeck.form.nameLabel")}
                </Label>
                <Input
                  id="name"
                  placeholder={t("sponsorDeck.form.namePlaceholder")}
                  className={inputClasses}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-400">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 text-sm">
                  {t("sponsorDeck.form.emailLabel")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("sponsorDeck.form.emailPlaceholder")}
                  className={inputClasses}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-400">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row: Company + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground/80 text-sm">
                  {t("sponsorDeck.form.companyLabel")}
                </Label>
                <Input
                  id="company"
                  placeholder={t("sponsorDeck.form.companyPlaceholder")}
                  className={inputClasses}
                  {...form.register("company")}
                />
                {form.formState.errors.company && (
                  <p className="text-xs text-red-400">
                    {form.formState.errors.company.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground/80 text-sm">
                  {t("sponsorDeck.form.roleLabel")}
                </Label>
                <Input
                  id="role"
                  placeholder={t("sponsorDeck.form.rolePlaceholder")}
                  className={inputClasses}
                  {...form.register("role")}
                />
              </div>
            </div>

            {/* Tier select */}
            <div className="space-y-2">
              <Label className="text-foreground/80 text-sm">
                {t("sponsorDeck.form.tierLabel")}
              </Label>
              <Select
                value={form.watch("tierInterest")}
                onValueChange={(val) => form.setValue("tierInterest", val)}
              >
                <SelectTrigger
                  className={cn(inputClasses, "w-full")}
                >
                  <SelectValue placeholder={t("sponsorDeck.form.tierPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {TIERS.map((tier) => (
                    <SelectItem
                      key={tier.value}
                      value={tier.value}
                      className="text-foreground focus:bg-primary/10 focus:text-foreground"
                    >
                      {tier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground/80 text-sm">
                {t("sponsorDeck.form.messageLabel")}
              </Label>
              <Textarea
                id="message"
                placeholder={t("sponsorDeck.form.messagePlaceholder")}
                className={cn(inputClasses, "min-h-[100px] resize-none")}
                {...form.register("message")}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-400 text-center"
              >
                {errorMsg || "Something went wrong. Please try again."}
              </motion.p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="w-full bg-primary hover:bg-primary-hover transition-all duration-300 px-[30px] py-[15px] text-[17px] font-semibold rounded-[10px] h-14"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  {t("sponsorDeck.form.submitting")}
                </>
              ) : (
                <>
                  <Send className="mr-2 w-5 h-5" />
                  {t("sponsorDeck.form.submit")}
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground/50 text-center">
              {t("sponsorDeck.form.disclaimer")}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
