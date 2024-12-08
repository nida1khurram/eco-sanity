import Image from 'next/image'

const chefs = [
  { name: 'D.Estwood', role: 'Head Chef', image: '/placeholder.svg' },
  { name: 'D.Scoriesh', role: 'Assistant Chef', image: '/placeholder.svg' },
  { name: 'M. William', role: 'Advertising Chef', image: '/placeholder.svg' },
  { name: 'W.Readfroad', role: 'Chef', image: '/placeholder.svg' },
]

export default function Chefs() {
  return (
    <section className="max-w-[1929px] mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="text-orange-500">Meet Our Chef</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {chefs.map((chef, index) => (
          <div key={index} className="text-center">
            <Image src={chef.image} alt={chef.name} width={200} height={200} className="rounded-lg mx-auto mb-4" />
            <h3 className="font-bold">{chef.name}</h3>
            <p className="text-gray-400">{chef.role}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
          See More
        </button>
      </div>
    </section>
  )
}

