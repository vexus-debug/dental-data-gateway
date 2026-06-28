import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Eye,
  Edit3,
  Image as ImageIcon,
  Layout,
  Palette,
  Search,
  Calendar,
  ExternalLink,
  Check,
  Sparkles,
  Stethoscope,
  Heart,
  Leaf,
  Building2,
  Smile,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/clinic/website")({
  head: () => ({ meta: [{ title: "Website — Dentallogue" }] }),
  component: WebsitePage,
});

type Template = {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  icon: typeof Stethoscope;
  palette: string[];
  badge?: string;
};

const templates: Template[] = [
  {
    id: "modern-clinic",
    name: "Modern Clinic",
    tagline: "Clean, trust-first layout for family practices",
    vibe: "Minimal · Bright · Booking-first",
    icon: Stethoscope,
    palette: ["#3B7CFF", "#E8F0FF", "#0F172A", "#F8FAFC"],
    badge: "Most popular",
  },
  {
    id: "warm-care",
    name: "Warm Care",
    tagline: "Friendly, approachable design for family dentists",
    vibe: "Soft · Welcoming · Story-led",
    icon: Heart,
    palette: ["#F97356", "#FFE7DD", "#1F1B16", "#FFF8F4"],
  },
  {
    id: "luxury-smile",
    name: "Luxury Smile",
    tagline: "Editorial cosmetic & aesthetic dentistry",
    vibe: "Premium · Dark · Cinematic",
    icon: Sparkles,
    palette: ["#C9A86A", "#0B0B0F", "#F5EEDC", "#1A1A22"],
    badge: "New",
  },
  {
    id: "organic-wellness",
    name: "Organic Wellness",
    tagline: "Holistic, calm aesthetic for wellness-focused clinics",
    vibe: "Earthy · Calm · Editorial",
    icon: Leaf,
    palette: ["#3F6B4A", "#E7EFE3", "#1B2A20", "#F4F7F1"],
  },
  {
    id: "corporate-multi",
    name: "Corporate Multi-Branch",
    tagline: "Multi-location dental groups and DSOs",
    vibe: "Structured · Confident · Locations",
    icon: Building2,
    palette: ["#1F3A8A", "#DBE3F4", "#0A1228", "#FFFFFF"],
  },
];

const fontPairs = [
  { id: "inter", heading: "Inter", body: "Inter" },
  { id: "playfair", heading: "Playfair Display", body: "Inter" },
  { id: "fraunces", heading: "Fraunces", body: "Manrope" },
  { id: "spacegrotesk", heading: "Space Grotesk", body: "DM Sans" },
];

const defaultSections = [
  { id: "hero", label: "Hero", on: true },
  { id: "services", label: "Services", on: true },
  { id: "about", label: "About / Team", on: true },
  { id: "testimonials", label: "Testimonials", on: true },
  { id: "pricing", label: "Pricing", on: false },
  { id: "gallery", label: "Smile Gallery", on: true },
  { id: "faq", label: "FAQ", on: true },
  { id: "booking", label: "Booking CTA", on: true },
  { id: "locations", label: "Locations & Map", on: true },
  { id: "contact", label: "Contact", on: true },
];

const defaultServices = [
  { name: "General Dentistry", icon: Smile, desc: "Cleanings, fillings, check-ups" },
  { name: "Cosmetic Dentistry", icon: Sparkles, desc: "Veneers, whitening, smile design" },
  { name: "Orthodontics", icon: Heart, desc: "Braces, Invisalign, aligners" },
  { name: "Implants", icon: Stethoscope, desc: "Single & full-arch implants" },
];

function WebsitePage() {
  const [tab, setTab] = useState("template");
  const [selected, setSelected] = useState<string>("modern-clinic");
  const [fontPair, setFontPair] = useState("inter");
  const [primary, setPrimary] = useState("#3B7CFF");
  const [sections, setSections] = useState(defaultSections);
  const [services, setServices] = useState(defaultServices);
  const [hero, setHero] = useState({
    title: "Healthy smiles, beautifully crafted.",
    subtitle:
      "Comprehensive family and cosmetic dentistry. Same-day appointments and gentle, modern care.",
    cta: "Book appointment",
  });
  const [about, setAbout] = useState({
    title: "About Dentallogue",
    body: "We're a team of caring clinicians committed to making every visit calm, clear, and confidence-building. From routine cleanings to full smile makeovers — we've got you.",
  });

  const active = templates.find((t) => t.id === selected) ?? templates[0];

  const toggleSection = (id: string) =>
    setSections((s) => s.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));

  const addService = () =>
    setServices((s) => [...s, { name: "New service", icon: Smile, desc: "Short description" }]);

  const removeService = (i: number) =>
    setServices((s) => s.filter((_, idx) => idx !== i));

  const updateService = (i: number, key: "name" | "desc", v: string) =>
    setServices((s) => s.map((x, idx) => (idx === i ? { ...x, [key]: v } : x)));

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Website</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a template, customize content, and publish your clinic site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Active template</div>
          <div className="mt-1 truncate text-lg font-semibold">{active.name}</div>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Sections enabled</div>
          <div className="mt-1 text-2xl font-semibold">
            {sections.filter((s) => s.on).length}/{sections.length}
          </div>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">Visitors / mo</div>
          <div className="mt-1 text-2xl font-semibold">12.8k</div>
        </div>
        <div className="surface-card p-4">
          <div className="text-xs text-muted-foreground">SEO score</div>
          <div className="mt-1 text-2xl font-semibold text-success">92</div>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="template">
            <Layout className="mr-1.5 h-3.5 w-3.5" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="content">
            <Edit3 className="mr-1.5 h-3.5 w-3.5" />
            Content
          </TabsTrigger>
          <TabsTrigger value="design">
            <Palette className="mr-1.5 h-3.5 w-3.5" />
            Design
          </TabsTrigger>
          <TabsTrigger value="sections">
            <Layout className="mr-1.5 h-3.5 w-3.5" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="booking">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            Booking
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === "template" && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((t, i) => {
            const isSelected = t.id === selected;
            const Icon = t.icon;
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelected(t.id)}
                className={`group surface-card relative overflow-hidden p-0 text-left transition-all ${
                  isSelected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
                }`}
              >
                {t.badge && (
                  <Badge className="absolute right-3 top-3 z-10 bg-primary text-primary-foreground">
                    {t.badge}
                  </Badge>
                )}
                {isSelected && (
                  <div className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <div
                  className="aspect-[4/3] w-full"
                  style={{
                    background: `linear-gradient(135deg, ${t.palette[0]} 0%, ${t.palette[1]} 100%)`,
                  }}
                >
                  <div className="flex h-full flex-col justify-between p-5">
                    <div
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 shadow"
                      style={{ color: t.palette[0] }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-2/3 rounded bg-white/70" />
                      <div className="h-2 w-1/2 rounded bg-white/50" />
                      <div className="mt-2 flex gap-1.5">
                        <div className="h-6 w-16 rounded bg-white/90" />
                        <div className="h-6 w-16 rounded border border-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{t.name}</div>
                    <div className="flex gap-1">
                      {t.palette.map((c) => (
                        <span
                          key={c}
                          className="h-3.5 w-3.5 rounded-full border border-border/60"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.tagline}</p>
                  <div className="text-xs text-muted-foreground">{t.vibe}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {tab === "content" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-5 space-y-4">
            <div className="font-medium">Hero</div>
            <div>
              <Label>Headline</Label>
              <Input
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subheadline</Label>
              <Textarea
                rows={3}
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              />
            </div>
            <div>
              <Label>Primary CTA</Label>
              <Input
                value={hero.cta}
                onChange={(e) => setHero({ ...hero, cta: e.target.value })}
              />
            </div>
            <div>
              <Label>Hero image</Label>
              <Button variant="outline" className="mt-1.5 w-full gap-2">
                <ImageIcon className="h-4 w-4" />
                Upload image
              </Button>
            </div>
          </div>

          <div className="surface-card p-5 space-y-4">
            <div className="font-medium">About</div>
            <div>
              <Label>Title</Label>
              <Input
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Body</Label>
              <Textarea
                rows={6}
                value={about.body}
                onChange={(e) => setAbout({ ...about, body: e.target.value })}
              />
            </div>
          </div>

          <div className="surface-card p-5 space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Services</div>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={addService}>
                <Plus className="h-3.5 w-3.5" />
                Add service
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border/60 p-3"
                  >
                    <GripVertical className="mt-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-accent-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <Input
                        value={s.name}
                        onChange={(e) => updateService(i, "name", e.target.value)}
                      />
                      <Input
                        value={s.desc}
                        onChange={(e) => updateService(i, "desc", e.target.value)}
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeService(i)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="surface-card p-5 space-y-3 lg:col-span-2">
            <div className="font-medium">Contact details</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+234 801 234 5678" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="hello@dentallogue.com" />
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <Input defaultValue="12 Admiralty Way, Lekki Phase 1, Lagos" />
              </div>
              <div>
                <Label>Opening hours</Label>
                <Input defaultValue="Mon–Sat · 9:00 – 19:00" />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input defaultValue="+234 801 234 5678" />
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "design" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-5">
            <div className="font-medium">Brand</div>
            <div className="mt-3 grid gap-3">
              <div>
                <Label>Primary color</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input value={primary} onChange={(e) => setPrimary(e.target.value)} />
                  <div
                    className="h-10 w-10 rounded-md border"
                    style={{ background: primary }}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  {["#3B7CFF", "#F97356", "#C9A86A", "#3F6B4A", "#1F3A8A", "#7C3AED"].map(
                    (c) => (
                      <button
                        key={c}
                        onClick={() => setPrimary(c)}
                        className="h-7 w-7 rounded-full border border-border/60"
                        style={{ background: c }}
                      />
                    ),
                  )}
                </div>
              </div>
              <div>
                <Label>Logo</Label>
                <Button variant="outline" className="mt-1.5 w-full gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Upload logo
                </Button>
              </div>
              <div>
                <Label>Favicon</Label>
                <Button variant="outline" className="mt-1.5 w-full gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Upload favicon
                </Button>
              </div>
            </div>
          </div>

          <div className="surface-card p-5">
            <div className="font-medium">Typography</div>
            <div className="mt-3 grid gap-2">
              {fontPairs.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontPair(f.id)}
                  className={`flex items-center justify-between rounded-lg border p-3 text-left transition ${
                    fontPair === f.id
                      ? "border-primary ring-1 ring-primary"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div>
                    <div className="text-base font-semibold">{f.heading}</div>
                    <div className="text-xs text-muted-foreground">Body · {f.body}</div>
                  </div>
                  {fontPair === f.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          <div className="surface-card p-5 lg:col-span-2">
            <div className="font-medium">Layout density</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Compact", "Comfortable", "Spacious"].map((t) => (
                <button
                  key={t}
                  className="rounded-xl border-2 border-border p-3 text-center text-sm hover:border-primary"
                >
                  <div className="aspect-video rounded bg-gradient-to-br from-primary/30 to-primary/10" />
                  <div className="mt-2">{t}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "sections" && (
        <div className="surface-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="font-medium">Page sections</div>
              <div className="text-xs text-muted-foreground">
                Toggle and reorder sections on your homepage.
              </div>
            </div>
          </div>
          <div className="divide-y divide-border/60">
            {sections.map((s) => (
              <div key={s.id} className="flex items-center gap-3 py-3">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 text-sm font-medium">{s.label}</div>
                <Badge
                  variant="outline"
                  className={
                    s.on
                      ? "bg-success/15 text-success"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {s.on ? "Visible" : "Hidden"}
                </Badge>
                <Switch checked={s.on} onCheckedChange={() => toggleSection(s.id)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "seo" && (
        <div className="surface-card max-w-2xl space-y-4 p-5">
          <div>
            <Label>Site title</Label>
            <Input defaultValue="Dentallogue Family Dentistry — Lagos, NG" />
          </div>
          <div>
            <Label>Meta description</Label>
            <Textarea
              rows={3}
              defaultValue="Comprehensive family and cosmetic dentistry in Lagos. Same-day appointments, modern techniques, gentle care."
            />
          </div>
          <div>
            <Label>Keywords</Label>
            <Input defaultValue="lagos dentist, family dentistry, cosmetic, root canal, invisalign" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <div className="text-sm font-medium">Google Business sync</div>
              <div className="text-xs text-muted-foreground">
                Push hours, services and posts to GBP
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      )}

      {tab === "booking" && (
        <div className="surface-card max-w-2xl space-y-4 p-5">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <div className="text-sm font-medium">Online booking widget</div>
              <div className="text-xs text-muted-foreground">
                Enabled on Home, Services, Book
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <div className="text-sm font-medium">Require deposit</div>
              <div className="text-xs text-muted-foreground">
                ₦25,000 deposit holds the slot
              </div>
            </div>
            <Switch />
          </div>
          <div>
            <Label>Buffer between bookings</Label>
            <Input defaultValue="15 min" />
          </div>
          <div>
            <Label>Embed code</Label>
            <Textarea
              readOnly
              rows={2}
              className="font-mono text-xs"
              defaultValue='<script src="https://book.dentallogue.com/widget.js" data-clinic="dl-1042"></script>'
            />
          </div>
        </div>
      )}
    </div>
  );
}
