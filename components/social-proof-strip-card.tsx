interface SocialProofStripCard {
    main: string,
    secondary: string
}

export default function SocialProofStripCard({main, secondary}: SocialProofStripCard) {
    return(
        <div className="shadow flex flex-col items-center justify-center w-96 p-10 bg-neutral-50 border border-neutral-300 rounded-xl shadow-xs hover:shadow-md transition-all">
          <h2 className="text-4xl font-semibold text-green-500">{main}</h2>
          <p className="text-xl font-semibold">{secondary}</p>
        </div>
    )
}