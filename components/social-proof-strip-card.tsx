interface SocialProofStripCard {
    main: string,
    secondary: string
}

export default function SocialProofStripCard({main, secondary}: SocialProofStripCard) {
    return(
        <div className="shadow border-b-2 bg-neutral-100 border-stone-400 flex flex-col items-center justify-center w-96 p-10">
          <h2 className="text-4xl font-semibold text-green-500">{main}</h2>
          <p className="text-xl font-semibold">{secondary}</p>
        </div>
    )
}