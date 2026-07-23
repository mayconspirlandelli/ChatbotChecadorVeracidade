const stats = [
  { number: '+47.000', label: 'Relatos Analisados' },
  { number: '92%', label: 'Taxa de Detecção' },
  { number: '<1 min', label: 'Tempo de Resposta' },
]

export default function Stats() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-10 rounded-lg bg-cinza-claro">
            <div className="text-laranja text-[48px] font-bold leading-none mb-4">
              {stat.number}
            </div>
            <div className="text-cinza-medio text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
