import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CategoryBadge from "@/components/landing/CategoryBadge";
import CountdownTimerDemo from "@/components/landing/CountdownTimerDemo";
import VideoPlayer from "@/components/landing/VideoPlayer";
import PriceBlock from "@/components/landing/PriceBlock";
import CtaButton from "@/components/landing/CtaButton";
import BenefitsList from "@/components/landing/BenefitsList";
import HandAnimations from "@/components/landing/HandAnimations";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-4 px-6 py-12">
        <h1 className="text-2xl font-semibold text-[var(--color-ink)]">
          Vista previa: Header y Footer
        </h1>
        <div className="flex flex-wrap gap-2">
          <CategoryBadge categoria="finca" tipoBadge={null} />
          <CategoryBadge categoria="bono_supermercado" tipoBadge={null} />
          <CategoryBadge categoria="cafeteria" tipoBadge="Combo especial" />
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-[var(--color-ink)]">
          Vista previa: componentes Sprint 4
        </h2>

        <CountdownTimerDemo />

        <div className="max-w-md">
          <VideoPlayer videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </div>

        <PriceBlock precioOriginal={350000} precioOferta={199000} moneda="COP" />

        <BenefitsList
          beneficios={[
            "Acceso a piscina natural",
            "Desayuno típico incluido",
            "Cabalgata guiada",
            "Parqueadero privado",
          ]}
        />

        <div className="max-w-md">
          <HandAnimations />
          <div className="mt-4">
            <CtaButton
              label="Comprar ahora"
              slug="finca-el-eden"
              wompiPublicKey="pub_test_xxx"
              wompiReference="ref-123"
              amountInCents={19900000}
              currency="COP"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
