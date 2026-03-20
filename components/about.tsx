// Pasang font di globals.css atau layout.tsx:
// @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

import { BlurFade } from "@/components/ui/blur-fade";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24"
      style={{ background: "#0d0d0b", color: "#e8e4d8", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Grid texture background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-8">

        {/* ── Header ── */}
        <BlurFade delay={0.1} inView>
          <div className="mb-18 grid grid-cols-[auto_1fr] items-end gap-8 mb-16">
            <div>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#C8922A",
                  fontWeight: 400,
                  marginBottom: 12,
                }}
              >
                Tentang Kami
              </p>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(64px, 10vw, 110px)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  color: "#e8e4d8",
                }}
              >
                SOKA{" "}
                <span style={{ color: "#C8922A" }}>UTAMA</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <div
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, #C8922A 0%, rgba(200,146,42,0.2) 60%, transparent 100%)",
                }}
              />
              <p style={{ fontSize: 13, color: "rgba(232,228,216,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                PT Soka Utama Niaga · Est. 2018
              </p>
            </div>
          </div>
        </BlurFade>

        {/* ── Content Grid ── */}
        <BlurFade delay={0.25} inView>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Left cell */}
            <div
              className="relative p-10"
              style={{ background: "#0d0d0b", borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Vertical accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 60,
                  background: "#C8922A",
                  borderRadius: "0 2px 2px 0",
                }}
              />
              <CellLabel>Misi Kami</CellLabel>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(232,228,216,0.72)", fontWeight: 300 }}>
                <strong style={{ color: "#e8e4d8", fontWeight: 500 }}>Didirikan pada 2018 silam</strong>,
                PT Soka Utama Niaga mendapatkan kepercayaan untuk memberikan layanan di bidang peralatan
                konstruksi, peralatan pengangkat, dan alat berat — khususnya{" "}
                <span style={{ color: "#C8922A", fontWeight: 500, borderBottom: "1px solid rgba(200,146,42,0.4)" }}>
                  Crane
                </span>
                .
              </p>
              <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.75, color: "rgba(232,228,216,0.72)", fontWeight: 300 }}>
                Perusahaan kami hadir untuk memenuhi kebutuhan Alat Berat guna mendukung{" "}
                <strong style={{ color: "#e8e4d8", fontWeight: 500 }}>optimalisasi bisnis dan pekerjaan Anda</strong>.
              </p>
            </div>

            {/* Right cell */}
            <div className="relative p-10" style={{ background: "#0d0d0b" }}>
              <CellLabel>Komitmen Kami</CellLabel>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(232,228,216,0.72)", fontWeight: 300 }}>
                Kami menyediakan berbagai jenis, fungsi, dan ukuran Crane dengan{" "}
                <strong style={{ color: "#e8e4d8", fontWeight: 500 }}>kualitas terbaik</strong>.
                Sebagai mitra yang dapat diandalkan, kami membangun hubungan kerja sama jangka panjang.
              </p>
              <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.75, color: "rgba(232,228,216,0.72)", fontWeight: 300 }}>
                Mengutamakan{" "}
                <strong style={{ color: "#e8e4d8", fontWeight: 500 }}>ketahanan kualitas crane</strong>,
                layanan purna jual, dan ketersediaan suku cadang.
              </p>
              {/* Crane icon */}
              <CraneIcon />
            </div>
          </div>
        </BlurFade>

        {/* ── Stats Row ── */}
        <BlurFade delay={0.4} inView>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
              overflow: "hidden",
              marginTop: 1,
            }}
          >
            <StatCell value="6+" label="Tahun Pengalaman" />
            <StatCell value="100%" label="Komitmen Kualitas" border />
            <StatCell value="24/7" label="Layanan Purna Jual" />
          </div>
        </BlurFade>

      </div>
    </section>
  );
}

// ── Sub-components ──

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(200,146,42,0.7)",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
      <span style={{ flex: 1, height: 1, background: "rgba(200,146,42,0.2)" }} />
    </div>
  );
}

function StatCell({ value, label, border }: { value: string; label: string; border?: boolean }) {
  const [num, suffix] = value.match(/^(\d+)(.*)$/)?.slice(1) ?? [value, ""];
  return (
    <div
      style={{
        background: "#111110",
        padding: "28px 32px",
        borderLeft: border ? "1px solid rgba(255,255,255,0.06)" : undefined,
        borderRight: border ? "1px solid rgba(255,255,255,0.06)" : undefined,
      }}
    >
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, color: "#e8e4d8", letterSpacing: "0.02em" }}>
        {num}
        <span style={{ color: "#C8922A", fontSize: 32 }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 12, color: "rgba(232,228,216,0.4)", marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function CraneIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 40, right: 40, width: 48, height: 48, opacity: 0.12 }}
    >
      <line x1="8" y1="44" x2="8" y2="4" stroke="#C8922A" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="6" x2="44" y2="6" stroke="#C8922A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="6" x2="24" y2="24" stroke="#C8922A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="6" x2="44" y2="18" stroke="#C8922A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="21" r="3" stroke="#C8922A" strokeWidth="1.5" />
      <line x1="4" y1="44" x2="12" y2="44" stroke="#C8922A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
