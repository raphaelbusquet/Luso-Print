import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { useCart } from '../context/CartContext'

const sections = [
  {
    id: 'termos',
    title: 'Termos e Condições',
    content: [
      {
        heading: '1. Identificação',
        text: 'A Lusoprint é um atelier de design e impressão 3D sediado em Lisboa, Portugal. Ao utilizar este website e efectuar encomendas, o utilizador aceita os presentes Termos e Condições.',
      },
      {
        heading: '2. Encomendas',
        text: 'As encomendas são realizadas através do WhatsApp após selecção dos produtos no website. A Lusoprint reserva-se o direito de recusar ou cancelar encomendas em caso de indisponibilidade de stock, erro de preço ou suspeita de uso fraudulento.',
      },
      {
        heading: '3. Preços',
        text: 'Todos os preços apresentados incluem IVA à taxa legal em vigor. Os preços podem ser alterados sem aviso prévio, mas as encomendas confirmadas mantêm o preço acordado no momento da encomenda.',
      },
      {
        heading: '4. Produção e Prazos',
        text: 'Os produtos são produzidos por impressão 3D no nosso atelier em Lisboa. O prazo de produção e entrega é de 5 a 10 dias úteis após confirmação da encomenda. Prazos específicos para produtos personalizados são comunicados aquando da confirmação.',
      },
      {
        heading: '5. Devoluções e Trocas',
        text: 'O cliente tem direito a devolver ou trocar produtos no prazo de 14 dias após a recepção, desde que os produtos se encontrem nas condições originais e não sejam produtos personalizados. Produtos personalizados não são elegíveis para devolução salvo defeito de fabrico.',
      },
      {
        heading: '6. Responsabilidade',
        text: 'A Lusoprint não se responsabiliza por danos causados por uso indevido dos produtos. As peças decorativas não são brinquedos e devem ser mantidas fora do alcance de crianças pequenas.',
      },
      {
        heading: '7. Propriedade Intelectual',
        text: 'Todo o conteúdo deste website — imagens, textos, designs e modelos 3D — é propriedade da Lusoprint e está protegido por direitos de autor. É proibida a reprodução ou utilização comercial sem autorização expressa.',
      },
      {
        heading: '8. Alterações',
        text: 'A Lusoprint reserva-se o direito de alterar os presentes Termos a qualquer momento. As alterações entram em vigor imediatamente após publicação no website.',
      },
    ],
  },
  {
    id: 'privacidade',
    title: 'Política de Privacidade',
    content: [
      {
        heading: '1. Responsável pelo Tratamento',
        text: 'A Lusoprint, com sede em Lisboa, Portugal, é a responsável pelo tratamento dos dados pessoais recolhidos através deste website, nos termos do Regulamento Geral sobre a Protecção de Dados (RGPD).',
      },
      {
        heading: '2. Dados Recolhidos',
        text: 'Recolhemos os dados que nos fornece directamente: nome, endereço de e-mail e preferências de personalização. Não recolhemos dados de pagamento — as encomendas são processadas via WhatsApp.',
      },
      {
        heading: '3. Finalidade do Tratamento',
        text: 'Os seus dados são utilizados para: processar e acompanhar encomendas; enviar a newsletter (apenas com o seu consentimento); guardar as suas preferências e imagens geradas no perfil; melhorar a experiência no website.',
      },
      {
        heading: '4. Newsletter',
        text: 'A subscrição da newsletter é voluntária. Pode cancelar a subscrição em qualquer momento através do link no rodapé de cada e-mail ou contactando-nos directamente.',
      },
      {
        heading: '5. Partilha de Dados',
        text: 'Não vendemos nem partilhamos os seus dados com terceiros para fins comerciais. Os dados podem ser partilhados com prestadores de serviços (como a Supabase para armazenamento seguro) exclusivamente para os fins acima descritos.',
      },
      {
        heading: '6. Retenção',
        text: 'Os dados são conservados pelo período necessário para as finalidades descritas. Os dados de conta são eliminados mediante pedido do titular.',
      },
      {
        heading: '7. Direitos do Titular',
        text: 'Tem direito a aceder, rectificar, apagar, limitar ou opor-se ao tratamento dos seus dados, bem como à portabilidade. Para exercer estes direitos, contacte-nos através de geral@lusoprint.pt.',
      },
      {
        heading: '8. Cookies',
        text: 'Utilizamos cookies essenciais para o funcionamento do website (sessão, preferências) e cookies analíticos para melhorar a experiência. Pode gerir as suas preferências de cookies a qualquer momento.',
      },
    ],
  },
]

export function TermosPage() {
  const { count: cartCount } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)
  const [active, setActive] = useState<'termos' | 'privacidade'>('termos')

  const section = sections.find(s => s.id === active)!

  return (
    <div>
      <Announce />
      <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={cartCount}
      />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '28px 0' }}>
        <div className="shell-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', transition: 'color 160ms' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
          >
            ← Início
          </Link>
          <div style={{ textAlign: 'center' }}>
            <div className="kicker" style={{ marginBottom: 4 }}>Lusoprint</div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1 }}>Informação Legal</div>
          </div>
          <div style={{ width: 80 }} />
        </div>
      </div>

      <div className="shell" style={{ padding: '56px 0 120px', maxWidth: 760, display: 'flex', gap: 60, alignItems: 'flex-start' }}>

        {/* Sidebar nav */}
        <div style={{ width: 180, flexShrink: 0, position: 'sticky', top: 120 }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id as 'termos' | 'privacidade')}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 0', fontFamily: 'inherit',
                fontSize: 13, letterSpacing: '0.04em',
                color: active === s.id ? 'var(--ink)' : 'var(--ink-mute)',
                borderBottom: active === s.id ? '1px solid var(--ink)' : '1px solid transparent',
                transition: 'color 160ms',
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="serif" style={{ margin: '0 0 40px', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400 }}>
            {section.title}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {section.content.map(item => (
              <div key={item.heading}>
                <h3 style={{ margin: '0 0 10px', fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontWeight: 500 }}>
                  {item.heading}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--rule)', fontSize: 12, color: 'var(--ink-mute)' }}>
            Última actualização: Maio 2026 · Questões: geral@lusoprint.pt
          </div>
        </div>
      </div>

      <Footer />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </div>
  )
}
